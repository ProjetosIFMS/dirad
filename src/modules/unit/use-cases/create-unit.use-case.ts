import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUnitRepository } from '../repository';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { CreateActivityUseCase } from 'src/activity/use-cases';

@Injectable()
export class CreateUnitUseCase {
  constructor(
    private readonly CreateUnitRepository: CreateUnitRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async createUnit(data: CreateUnitDto) {
    try {
      const unit = await this.CreateUnitRepository.create(data);
      this.logger.log('Unit Created', CreateActivityUseCase);
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
