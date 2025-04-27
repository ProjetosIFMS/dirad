import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateActivityRepository } from '../repository';
import { CreateActivityDto } from '../dto/create-activity.dto';

@Injectable()
export class CreateActivityUseCase {
  constructor(
    private readonly ActivityRepository: CreateActivityRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateActivityDto) {
    try {
      const activity = await this.ActivityRepository.create(data);
      this.logger.log('Activity Created', CreateActivityUseCase.name);
      return activity;
    } catch (err) {
      const error = new ServiceUnavailableException(
        'Failed to create activity',
        {
          cause: err,
          description: `Error creating Activity: ${err.message || 'Unknown error occurred'}`,
        },
      );
      this.logger.error(error.message, err.stack);
      throw error;
    }
  }
}
