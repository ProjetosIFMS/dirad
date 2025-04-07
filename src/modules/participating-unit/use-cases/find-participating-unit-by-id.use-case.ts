import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindParticipatingUnitByIdRepository } from '../repository/find-participating-unit-by-id.repository';

@Injectable()
export class FindParticipatingUnitByIdUseCase {
  constructor(
    private readonly findParticipatingUnitByIdRepository: FindParticipatingUnitByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(participating_unit_id: string) {
    try {
      const participatingUnit =
        await this.findParticipatingUnitByIdRepository.findById(
          participating_unit_id,
        );

      if (!participatingUnit) {
        this.logger.error(
          'Participating Unit not found',
          FindParticipatingUnitByIdUseCase.name,
        );
        throw new NotFoundException('Participating Unit not found');
      }
      return participatingUnit;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding Participating Unit',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
