import { Logger, Module } from '@nestjs/common';
import { ProcessTypeService } from './process-type.service';
import { ProcessTypeController } from './process-type.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  controllers: [ProcessTypeController],
  providers: [ProcessTypeService, ...usecases, ...repositories, Logger],
})
export class ProcessTypeModule {}
