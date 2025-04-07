import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUnitRepository } from '../repository';
import { CreateUnitDto } from '../dto/create-unit.dto';

@Injectable()
export class CreateUnitUseCase {
  constructor(
    private readonly UnitRepository: CreateUnitRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateUnitDto) {
    try {
      const unit = await this.UnitRepository.create(data);
      this.logger.log('Unit Created', CreateUnitUseCase.name);
      return unit;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating Unit',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
