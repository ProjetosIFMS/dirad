import { Logger, Module } from '@nestjs/common';
import * as UseCases from './use-cases';
import * as Repositories from './repository';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { SharedModule } from 'src/shared/shared.module';

const usecases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  imports: [SharedModule],
  controllers: [ActivityController],
  providers: [ActivityService, ...usecases, ...repositories, Logger],
})
export class ActivityModule {}
