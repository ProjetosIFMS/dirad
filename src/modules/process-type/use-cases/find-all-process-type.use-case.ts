import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllProcessTypeRepository } from '../repository';

@Injectable()
export class FindAllProcessTypeUseCase {
  constructor(
    private readonly processTypeRepository: FindAllProcessTypeRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const processType = await this.processTypeRepository.findAll();
      if (!processType) {
        throw new NotFoundException('Process Type not found');
      }
      this.logger.log('Process Type found', FindAllProcessTypeUseCase.name);
      return processType;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error finding process type',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
