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
    private readonly UnitRepository: UpdateUnitRepository,
    private readonly FindUnitByIdRepository: FindUnitByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateUnitDto) {
    try {
      const unitExist = await this.FindUnitByIdRepository.findById(id);
      if (!unitExist) {
        throw new NotFoundException('Unit Not Found!');
      }

      const unit = await this.UnitRepository.update(id, data);
      this.logger.log('Unit Updated', UpdateUnitUseCase.name);
      return unit;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened!', {
        cause: err,
        description: 'Error updating unit',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
