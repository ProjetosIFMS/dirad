import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllStepsRepository } from '../repository';

@Injectable()
export class FindAllStepsUseCase {
  constructor(
    private readonly StepRepository: FindAllStepsRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const step = await this.StepRepository.FindAll();
      if (!step) {
        throw new NotFoundException('Step not found');
      }
      this.logger.log('Step Found', FindAllStepsUseCase.name);
      return step;
    } catch (err) {
      const error = new ServiceUnavailableException({
        message: 'Failed to find steps',
        cause: err,
        description: `Error finding Steps: ${err.message || 'Unknown error occurred'}`,
      });
      this.logger.error(error.message, err.stack);
      throw error;
    }
  }
}
