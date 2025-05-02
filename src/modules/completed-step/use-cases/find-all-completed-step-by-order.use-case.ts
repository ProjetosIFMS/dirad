import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllCompletedStepByOrderRepository } from '../repository';

@Injectable()
export class FindAllCompletedStepByOrderUseCase {
  constructor(
    private readonly completedStepRepository: FindAllCompletedStepByOrderRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const completedSteps =
        await this.completedStepRepository.findAllCompletedStepByOrder();
      if (!completedSteps) {
        throw new NotFoundException('Completed Steps not found');
      }
      this.logger.log(
        'Completed Steps Found',
        FindAllCompletedStepByOrderUseCase.name,
      );
      return completedSteps;
    } catch (err) {
      const error = new ServiceUnavailableException({
        message: 'Failed to find Completed Steps by order',
        cause: err,
        description: 'Error finding Completed Steps',
      });
      this.logger.error(error.message, err.stack);
      throw error;
    }
  }
}
