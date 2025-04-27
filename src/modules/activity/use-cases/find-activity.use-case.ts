import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindActivityByIdRepository } from '../repository/find-activity.repository';

@Injectable()
export class FindActivityByIdUseCase {
  constructor(
    private readonly findActivitydRepository: FindActivityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, includeSteps: boolean) {
    try {
      const shouldIncludeSteps =
        typeof includeSteps === 'string' && includeSteps === 'true'
          ? true
          : false;
      const activityExist = await this.findActivitydRepository.findById(
        id,
        shouldIncludeSteps,
      );
      if (!activityExist) {
        throw new NotFoundException('Activity not found');
      }
      this.logger.log('Activity Found', FindActivityByIdUseCase.name);
      return activityExist;
    } catch (err) {
      const error = new ServiceUnavailableException('Failed to find activity', {
        cause: err,
        description: `Error finding Activity: ${err.message || 'Unknown error occurred'}`,
      });
      this.logger.error(error.message, err.stack);
      throw error;
    }
  }
}
