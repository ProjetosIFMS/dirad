import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly logger: Logger) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
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
