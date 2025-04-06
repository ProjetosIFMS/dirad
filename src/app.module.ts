import { UserModule } from './modules/user/user.module';
import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StepModule } from './modules/step/step.module';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleStrategy } from './shared/strategies/google.strategy';
import { AuthService } from './modules/auth/auth.service';
import { ActivityModule } from './activity/activity.module';
import { UnitModule } from './modules/unit/unit.module';
import { ProcessTypeModule } from './modules/process-type/process-type.module';

@Module({
  imports: [
    StepModule,
    UserModule,
    AuthModule,
    ActivityModule,
    UnitModule,
    ProcessTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, GoogleStrategy, Logger],
})
export class AppModule {}
