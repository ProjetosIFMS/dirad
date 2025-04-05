import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllUnitRepository } from '../repository';

@Injectable()
export class FindAllUnitUseCase {
  constructor(
    private readonly FindAllUnitRepository: FindAllUnitRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async findAll() {
    try {
      return await this.FindAllUnitRepository.FindAllUnit();
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding Unit',
      });
      this.logger.error(err);
      throw err;
    }
  }
}
