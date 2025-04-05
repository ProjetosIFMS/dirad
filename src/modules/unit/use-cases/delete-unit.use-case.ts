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
    private readonly DeleUnitRepository: DeleteUnitRepository,
    private readonly findUnitRepository: FindUnitByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async deleteUnit(id: string) {
    try {
      const unitExist = await this.findUnitRepository.FindUnitById(id);

      if (!unitExist) {
        const error = new NotFoundException('Unit not found!');
        this.logger.error(error.message);
        throw error;
      }

      const unit = await this.DeleUnitRepository.deleteUnit(id);
      this.logger.log('Unit Deleted', DeleteUnitRepository.name);
      return unit;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting unit',
      });
    }
  }
}
