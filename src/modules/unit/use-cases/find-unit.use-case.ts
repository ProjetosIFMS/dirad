import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindUnitByIdRepository } from '../repository';

@Injectable()
export class FindUnitByIdUseCase {
  constructor(
    private readonly UnitRepository: FindUnitByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const unitExist = await this.UnitRepository.findById(id);
      if (!unitExist) {
        throw new NotFoundException('Unit not found');
      }
      this.logger.log('Unit Found', FindUnitByIdUseCase.name);
      return unitExist;
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
