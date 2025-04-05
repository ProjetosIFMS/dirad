import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindUnitByIdRepository, UpdateUnitRepository } from '../repository';
import { UpdateUnitDto } from '../dto/update-unit.dto';

@Injectable()
export class UpdateUnitUseCase {
  constructor(
    private readonly UpdateUnitRepository: UpdateUnitRepository,
    private readonly FindUnitByIdRepository: FindUnitByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async updateUnit(id: string, data: UpdateUnitDto) {
    try {
      const unitExist = await this.FindUnitByIdRepository.FindUnitById(id);
      if (!unitExist) {
        const error = new NotFoundException('Unit Not Found!');
        this.logger.error(error.message);
        throw error;
      }

      const unit = await this.UpdateUnitRepository.updateUnit(id, data);
      this.logger.log('Unit Updated', UpdateUnitUseCase.name);
      return unit;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened!', {
        cause: err,
        description: 'Error updating unit',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
