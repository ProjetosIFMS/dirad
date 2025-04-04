import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StepModule } from './modules/step/step.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [StepModule, ActivityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
