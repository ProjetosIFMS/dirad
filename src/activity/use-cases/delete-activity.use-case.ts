import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  DeleteActivityRepository,
  FindActivityByIdRepository,
} from '../repository';

@Injectable()
export class DeleteActivityUseCase {
  constructor(
    private readonly ActivityRepository: DeleteActivityRepository,
    private readonly findActivityByIdRepository: FindActivityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const activityExist = await this.findActivityByIdRepository.findById(id);
      if (!activityExist) {
        throw new NotFoundException('Activity not found');
      }

      const activity = await this.ActivityRepository.delete(id);
      this.logger.log('Activity Deleted', DeleteActivityUseCase.name);
      return activity;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error Deleting Activity',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
