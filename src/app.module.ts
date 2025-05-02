import { UserModule } from './modules/user/user.module';
import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StepModule } from './modules/step/step.module';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleStrategy } from './shared/strategies/google.strategy';
import { AuthService } from './modules/auth/auth.service';
import { ActivityModule } from './modules/activity/activity.module';
import { UnitModule } from './modules/unit/unit.module';
import { ProcessTypeModule } from './modules/process-type/process-type.module';
import { ParticipatingUnitModule } from './modules/participating-unit/participating-unit.module';
import { ChecklistModule } from './modules/checklist/checklist.module';
import { ProcessModule } from './modules/process/process.module';
import { CompletedStepModule } from './modules/completed-step/completed-step.module';
import { JwtStrategy } from './shared/strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { ModalityModule } from './modules/modality/modality.module';
import { SectorModule } from './modules/sector/sector.module';
import { NotificationModule } from './modules/notifications/notification.module';

@Module({
  imports: [
    StepModule,
    UserModule,
    AuthModule,
    ActivityModule,
    UnitModule,
    ProcessTypeModule,
    ParticipatingUnitModule,
    ChecklistModule,
    ProcessModule,
    CompletedStepModule,
    ModalityModule,
    SectorModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    Logger,
  ],
})
export class AppModule {}
