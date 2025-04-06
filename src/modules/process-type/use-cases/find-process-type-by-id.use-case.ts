import { FindProcessTypeByIdRepository } from '../repository';
import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

@Injectable()
export class FindProcessTypeByIdUseCase {
  constructor(
    private readonly processTypeRepository: FindProcessTypeByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const processType = await this.processTypeRepository.findById(id);
      if (!processType) {
        throw new NotFoundException('Process Type not found');
      }
      this.logger.log('Process Type found', FindProcessTypeByIdUseCase.name);
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
