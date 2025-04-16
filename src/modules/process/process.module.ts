import { Logger, Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';
import { ChecklistModule } from '../checklist/checklist.module';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  controllers: [ProcessController],
  imports: [ChecklistModule],
  providers: [ProcessService, ...usecases, ...repositories, Logger],
})
export class ProcessModule {}
