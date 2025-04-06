import { Logger, Module } from '@nestjs/common';
import * as UseCases from './use-cases';
import * as Repositories from './repository';
import { StepService } from './step.service';
import { StepController } from './step.controller';
import { SharedModule } from 'src/shared/shared.module';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  imports: [SharedModule],
  controllers: [StepController],
  providers: [StepService, ...usecases, ...repositories, Logger],
})
export class StepModule {}
