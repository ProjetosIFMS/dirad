import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllStepByOrderRepository } from '../repository';

@Injectable()
export class FindAllStepByOrderUseCase {
  constructor(
    private readonly StepRepository: FindAllStepByOrderRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const steps = await this.StepRepository.findAllStepByOrder();
      if (!steps) {
        throw new NotFoundException('Steps not found');
      }
      this.logger.log('Steps Found', FindAllStepByOrderUseCase.name);
      return steps;
    } catch (err) {
      const error = new ServiceUnavailableException({
        message: 'Failed to find Steps by order',
        cause: err,
        description: 'Error finding Steps',
      });
      this.logger.error(error.message, err.stack);
      throw error;
    }
  }
}
