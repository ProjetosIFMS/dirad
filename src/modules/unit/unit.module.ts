import { Logger, Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';
import { SharedModule } from 'src/shared/shared.module';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  imports: [SharedModule],
  controllers: [UnitController],
  providers: [UnitService, Logger, ...usecases, ...repositories],
})
export class UnitModule {}
