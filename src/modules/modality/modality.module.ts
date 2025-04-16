import { Logger, Module } from '@nestjs/common';
import { ModalityService } from './modality.service';
import { ModalityController } from './modality.controller';
import * as UseCases from './use-cases';
import * as Repositories from './repository';
import { SharedModule } from 'src/shared/shared.module';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  imports: [SharedModule],
  controllers: [ModalityController],
  providers: [ModalityService, ...usecases, ...repositories, Logger],
})
export class ModalityModule {}
