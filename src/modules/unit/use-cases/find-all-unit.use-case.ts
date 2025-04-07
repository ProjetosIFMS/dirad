import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllUnitRepository } from '../repository';

@Injectable()
export class FindAllUnitUseCase {
  constructor(
    private readonly UnitRepository: FindAllUnitRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      return await this.UnitRepository.findAll();
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding Unit',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
