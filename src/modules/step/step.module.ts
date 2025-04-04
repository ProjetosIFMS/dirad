import { Logger, Module } from '@nestjs/common';
import * as UseCases from './use-cases';
import { StepService } from './step.service';
import { StepController } from './step.controller';
import { StepRepository } from './repository/create-step.repository';
import { SharedModule } from 'src/shared/shared.module';
import { FindAllStepsRepository } from './repository/find-all-step.repository';
import { FindStepRepository } from './repository/find-step.repository';
import { UpdateStepRepository } from './repository/update-step.repository';
import { DeleteStepRepository } from './repository/delete-step.repository';

const usecases = Object.values(UseCases);

@Module({
  imports: [SharedModule],
  controllers: [StepController],
  providers: [
    StepService,
    ...usecases,
    Logger,
    StepRepository,
    FindAllStepsRepository,
    FindStepRepository,
    UpdateStepRepository,
    DeleteStepRepository,
  ],
})
export class StepModule {}
