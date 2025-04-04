import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllStepsRepository } from '../repository/find-all-step.repository';

@Injectable()
export class FindAllStepsUseCase {
  constructor(
    private readonly FindAllStepsRepository: FindAllStepsRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async findAll() {
    try {
      return await this.FindAllStepsRepository.FindAllSteps();
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error Finding Steps',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
