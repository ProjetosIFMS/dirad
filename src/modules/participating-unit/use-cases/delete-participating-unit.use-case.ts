import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindParticipatingUnitByIdRepository } from '../repository/find-participating-unit-by-id.repository';
import { DeleteParticipatingUnitRepository } from '../repository/delete-participating-unit.repository';

@Injectable()
export class DeleteParticipatingUnitUseCase {
  constructor(
    private readonly findParticipatingUnitUseCaseRepository: FindParticipatingUnitByIdRepository,
    private readonly deleteParticipatingUnitUseCaseRepository: DeleteParticipatingUnitRepository,
    private readonly logger: Logger,
  ) {}

  async execute(participating_unit_id: string) {
    try {
      const participatingUnitExists =
        await this.findParticipatingUnitUseCaseRepository.findById(
          participating_unit_id,
        );
      if (!participatingUnitExists) {
        throw new NotFoundException('Participating Unit not found');
      }
      const deletedParticipatingUnit =
        await this.deleteParticipatingUnitUseCaseRepository.delete(
          participating_unit_id,
        );
      this.logger.log(
        'Participating Unit deleted',
        DeleteParticipatingUnitUseCase.name,
      );
      return deletedParticipatingUnit;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting Participating Unit',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
