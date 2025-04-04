import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllActivityRepository } from '../repository/find-all-activity.repository';

@Injectable()
export class FindAllActivityUseCase {
  constructor(
    private readonly FindAllActivityRepository: FindAllActivityRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async findAll() {
    try {
      return await this.FindAllActivityRepository.FindAllActivity();
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error Finding Actitivity',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
