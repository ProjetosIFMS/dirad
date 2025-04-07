import { Logger, Module } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { ChecklistController } from './checklist.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';

const useCases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  controllers: [ChecklistController],
  providers: [ChecklistService, ...useCases, ...repositories, Logger],
})
export class ChecklistModule {}
