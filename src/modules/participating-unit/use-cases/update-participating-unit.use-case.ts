import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateParticipatingUnitRepository } from '../repository/update-participating-unit.repository';
import { FindParticipatingUnitByIdRepository } from '../repository/find-participating-unit-by-id.repository';
import { UpdateParticipatingUnitDto } from '../dto/update-participating-unit.dto';

@Injectable()
export class UpdateParticipatingUnitUseCase {
  constructor(
    private readonly updateParticipatingUnitRepository: UpdateParticipatingUnitRepository,
    private readonly findParticipatingUnitByIdRepository: FindParticipatingUnitByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    participating_unit_id: string,
    data: UpdateParticipatingUnitDto,
  ) {
    try {
      const participatingUnitExists =
        await this.findParticipatingUnitByIdRepository.findById(
          participating_unit_id,
        );

      if (!participatingUnitExists) {
        throw new NotFoundException('Participating Unit not found.');
      }

      const updatedParticipatingUnit =
        await this.updateParticipatingUnitRepository.update(
          participating_unit_id,
          data,
        );
      this.logger.log(
        'Participating Unit updated',
        UpdateParticipatingUnitUseCase.name,
      );
      return updatedParticipatingUnit;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating Participating Unit',
      });

      this.logger.error(error.message);
      throw err;
    }
  }
}
