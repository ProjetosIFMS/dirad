import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllByOrderRepository } from '../repository/find-all-by-order.repository';

@Injectable()
export class FindAllByOrderUseCase {
  constructor(
    private readonly ActivityRepository: FindAllByOrderRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const activities = await this.ActivityRepository.findAllByOrder();
      this.logger.log('Activities found by order', FindAllByOrderUseCase.name);
      return activities;
    } catch (err) {
      const error = new ServiceUnavailableException({
        message: 'Failed to find activities by order',
        cause: err,
        description: `Error finding activities by order: ${err.message || 'Unknown error occurred'}`,
      });
      this.logger.error(error.message, err.stack);
      throw error;
    }
  }
}
