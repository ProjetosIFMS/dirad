import { Logger, Module } from '@nestjs/common';
import { CompletedStepService } from './completed-step.service';
import { CompletedStepController } from './completed-step.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';
import { SharedModule } from 'src/shared/shared.module';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  imports: [SharedModule],
  controllers: [CompletedStepController],
  providers: [CompletedStepService, Logger, ...usecases, ...repositories],
})
export class CompletedStepModule {}
