import { FindStepByIdRepository } from '../repository';
import {
  Logger,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class FindStepByIdUseCase {
  constructor(
    private readonly StepRepository: FindStepByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const step = await this.StepRepository.FindById(id);
      if (!step) {
        throw new NotFoundException('Step not found');
      }
      this.logger.log('Step found', FindStepByIdUseCase.name);
      return step;
    } catch (err) {
      const error = new ServiceUnavailableException({
        message: 'Failed to find step',
        cause: err,
        description: `Error finding Step: ${err.message || 'Unknown error occurred'}`,
      });
      this.logger.error(error.message, err.stack);
      throw error;
    }
  }
}
