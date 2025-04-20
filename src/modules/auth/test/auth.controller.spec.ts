import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockUser = {
    id: 'user-1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    picture: 'profile.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            generateJwt: jest.fn().mockReturnValue('mock.jwt.token'),
            googleLogin: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('googleAuth', () => {
    it('should exist as a route handler', () => {
      expect(controller.googleAuth).toBeDefined();
    });
  });

  describe('googleAuthRedirect', () => {
    it('should redirect with access token', () => {
      const mockReq = { user: mockUser };
      const mockRes = {
        redirect: jest.fn(),
      };
      process.env.FRONTEND_URL = 'http://localhost:3000/';

      controller.googleAuthRedirect(mockReq, mockRes);

      expect(service.generateJwt).toHaveBeenCalledWith(mockUser);
      expect(mockRes.redirect).toHaveBeenCalledWith(
        `${process.env.FRONTEND_URL}mock.jwt.token`,
      );
    });
  });

  describe('getProfile', () => {
    it('should return user profile', () => {
      const mockReq = { user: mockUser };
      jest.spyOn(service, 'googleLogin').mockReturnValue({
        user: mockUser,
        access_token: 'mock.jwt.token',
      });

      const result = controller.getProfile(mockReq);

      expect(service.googleLogin).toHaveBeenCalledWith(mockReq);
      expect(result).toEqual({
        user: mockUser,
        access_token: 'mock.jwt.token',
      });
    });
  });
});
