import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateActivityRepository } from '../repository/update-activity.repository';
import { UpdateActivityDto } from '../dto/update-activity.dto';
import { FindActivityRepository } from '../repository/find-activity.repository';
import { UpdateStepUseCase } from 'src/modules/step/use-cases';

@Injectable()
export class UpdateActivityUseCase {
  constructor(
    private readonly UpdateActivityRepository: UpdateActivityRepository,
    private readonly FindActivityRepository: FindActivityRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateActivityDto) {
    try {
      const activityExist =
        await this.FindActivityRepository.FindActivityById(id);

      if (!activityExist) {
        const error = new NotFoundException('Activity Not Found!');
        this.logger.error(error.message);
        throw error;
      }

      const activity = await this.UpdateActivityRepository.updateActivity(
        id,
        data,
      );
      this.logger.log('Activity Updated', UpdateStepUseCase.name);
      return activity;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating activity',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
