import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  generateJwt(user: any) {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    };
    return this.jwtService.sign(payload);
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const payload = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
    };

    return {
      message: 'User information',
      user: {
        ...payload,
      },
    };
  }

  async validateGoogleAccessToken(accessToken: string): Promise<any> {
    const googleUserInfoUrl = process.env.GOOGLE_USERINFO_URL;

    try {
      const response = await axios.get(
        `${googleUserInfoUrl}?access_token=${accessToken}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('Error validating Google access token', error);
      throw new UnauthorizedException('Invalid Google access token');
    }
  }
}
