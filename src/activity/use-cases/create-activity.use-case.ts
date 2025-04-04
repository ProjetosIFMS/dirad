import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateActivityRepository } from '../repository/create-activity.repository';
import { CreateActivityDto } from '../dto/create-activity.dto';

@Injectable()
export class CreateActivityUseCase {
  constructor(
    private readonly CreateActivityRepository: CreateActivityRepository,
    private readonly logger: Logger,
  ) {}

  async createActivity(data: CreateActivityDto) {
    try {
      const activity = await this.CreateActivityRepository.create(data);
      this.logger.log('Activity Created', CreateActivityUseCase);
      return activity;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating Activity',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
