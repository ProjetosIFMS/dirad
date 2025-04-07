import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteUnitRepository, FindUnitByIdRepository } from '../repository';

@Injectable()
export class DeleteUnitUseCase {
  constructor(
    private readonly UnitRepository: DeleteUnitRepository,
    private readonly findUnitRepository: FindUnitByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const unitExist = await this.findUnitRepository.findById(id);

      if (!unitExist) {
        throw new NotFoundException('Unit not found!');
      }

      const unit = await this.UnitRepository.delete(id);
      this.logger.log('Unit Deleted', DeleteUnitUseCase.name);
      return unit;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting unit',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
