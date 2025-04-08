import { Logger, Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  controllers: [ProcessController],
  providers: [ProcessService, ...usecases, ...repositories, Logger],
})
export class ProcessModule {}
