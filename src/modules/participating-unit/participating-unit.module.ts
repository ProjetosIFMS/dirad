import { Logger, Module } from '@nestjs/common';
import { ParticipatingUnitController } from './participating-unit.controller';
import { ParticipatingUnitService } from './participating-unit.service';
import * as UseCases from './use-cases';
import * as Repositories from './repository';
const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  controllers: [ParticipatingUnitController],
  providers: [ParticipatingUnitService, ...usecases, ...repositories, Logger],
})
export class ParticipatingUnitModule {}
