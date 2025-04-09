import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllCompletedStepRepository } from '../repository';

@Injectable()
export class FindAllCompletedStepUseCase {
  constructor(
    private readonly CompletedStepRepository: FindAllCompletedStepRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      return await this.CompletedStepRepository.findAll();
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding Completed Steps',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
