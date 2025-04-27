import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllActivityRepository } from '../repository/find-all-activity.repository';

@Injectable()
export class FindAllActivityUseCase {
  constructor(
    private readonly ActivityRepository: FindAllActivityRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(includeSteps: boolean) {
    try {
      const shouldIncludeSteps =
        typeof includeSteps === 'string' && includeSteps === 'true'
          ? true
          : false;
      return await this.ActivityRepository.findAll(shouldIncludeSteps);
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error Finding Actitivity',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
