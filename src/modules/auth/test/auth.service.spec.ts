import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { Logger, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

jest.mock('axios');

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockUser = {
    id: 'user-1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    picture: 'profile.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock.jwt.token'),
          },
        },
        Logger,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateJwt', () => {
    it('should generate a JWT token with correct payload', () => {
      const token = service.generateJwt(mockUser);

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        picture: mockUser.picture,
      });
      expect(token).toBe('mock.jwt.token');
    });
  });

  describe('googleLogin', () => {
    it('should return error message if no user in request', () => {
      const result = service.googleLogin({ user: null });
      expect(result).toBe('No user from Google');
    });

    it('should return user and token if user exists', () => {
      const req = { user: mockUser };
      const result = service.googleLogin(req);

      expect(result).toEqual({
        user: mockUser,
        access_token: 'mock.jwt.token',
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        username: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        picture: mockUser.picture,
      });
    });
  });

  describe('validateGoogleAccessToken', () => {
    const mockAccessToken = 'valid.google.token';
    const mockGoogleUserInfo = {
      email: 'john.doe@example.com',
      given_name: 'John',
      family_name: 'Doe',
      picture: 'profile.jpg',
    };

    beforeEach(() => {
      process.env.GOOGLE_USERINFO_URL =
        'https://www.googleapis.com/oauth2/v3/userinfo';
    });

    it('should validate and return google user info for valid token', async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: mockGoogleUserInfo,
      });

      const result = await service.validateGoogleAccessToken(mockAccessToken);

      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.GOOGLE_USERINFO_URL}?access_token=${mockAccessToken}`,
        {
          headers: { Authorization: `Bearer ${mockAccessToken}` },
        },
      );
      expect(result).toEqual(mockGoogleUserInfo);
    });

    it('should throw UnauthorizedException for invalid token', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(
        new Error('Invalid token'),
      );

      await expect(
        service.validateGoogleAccessToken('invalid.token'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
