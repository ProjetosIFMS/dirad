import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateActivityDto } from '../dto/update-activity.dto';
import {
  UpdateActivityRepository,
  FindActivityByIdRepository,
} from '../repository';

@Injectable()
export class UpdateActivityUseCase {
  constructor(
    private readonly ActivityRepository: UpdateActivityRepository,
    private readonly FindActivityRepository: FindActivityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateActivityDto) {
    try {
      const activityExist = await this.FindActivityRepository.findById(id);
      if (!activityExist) {
        throw new NotFoundException('Activity Not Found!');
      }

      const activity = await this.ActivityRepository.update(id, data);
      this.logger.log('Activity Updated', UpdateActivityUseCase.name);
      return activity;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating activity',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
