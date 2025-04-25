import { Logger, Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorController } from './sector.controller';
import { SharedModule } from 'src/shared/shared.module';
import * as Repositories from './repository';
import * as UseCases from './use-cases';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  imports: [SharedModule],
  controllers: [SectorController],
  providers: [SectorService, Logger, ...usecases, ...repositories],
})
export class SectorModule {}
