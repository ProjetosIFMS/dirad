import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindUnitByIdRepository } from '../repository';
import { FindAllActivityRepository } from 'src/modules/activity/repository';

@Injectable()
export class FindUnitByIdUseCase {
  constructor(
    private readonly findUnitByIdRepository: FindUnitByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async findById(id: string) {
    try {
      const unitExist = await this.findUnitByIdRepository.FindUnitById(id);

      if (!unitExist) {
        const error = new NotFoundException('Unit not found');
        this.logger.error(error.message);
        throw error;
      }
      this.logger.log('Unit Found', FindAllActivityRepository.name);
      return unitExist;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding Unit',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
