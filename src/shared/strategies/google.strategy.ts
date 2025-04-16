import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { CreateUserRepository } from '../../modules/user/repository/create-user.repository';
import { FindUserByEmailRepository } from '../../modules/user/repository/find-user-by-email.repository';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const googleUser =
        await this.authService.validateGoogleAccessToken(accessToken);

      const email = googleUser.email;
      let user = await this.findUserByEmailRepository.findUserByEmail(email);

      if (!user) {
        user = await this.createUserRepository.createUser({
          email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          picture: googleUser.picture,
          password: '',
        });
      }

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
