import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  DeleteActivityRepository,
  FindActivityRepository,
} from '../repository';

@Injectable()
export class DeleteActivityUseCase {
  constructor(
    private readonly DeleteActivityRepository: DeleteActivityRepository,
    private readonly findActivityRepository: FindActivityRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const activityExist =
        await this.findActivityRepository.FindActivityById(id);

      if (!activityExist) {
        const error = new NotFoundException('Activity not found');
        this.logger.error(error.message);
        throw error;
      }

      const activity = await this.DeleteActivityRepository.deleteActivity(id);
      this.logger.log('Activity Deleted', DeleteActivityRepository.name);
      return activity;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error Deleting Activity',
      });
    }
  }
}
