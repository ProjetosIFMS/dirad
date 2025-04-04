import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindActivityRepository } from '../repository/find-activity.repository';

@Injectable()
export class FindActivityByIdUseCase {
  constructor(
    private readonly findActivityById: FindActivityRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const activityExist = await this.findActivityById.FindActivityById(id);

      if (!activityExist) {
        const error = new NotFoundException('Activity not found');
        this.logger.error(error.message);
        throw error;
      }
      this.logger.log('Activity Found', FindActivityRepository.name);
      return activityExist;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding Actitivty',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
