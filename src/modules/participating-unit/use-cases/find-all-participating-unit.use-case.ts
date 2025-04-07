import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllParticipatingUnitRepository } from '../repository/find-all-participating-unit.repository';

@Injectable()
export class FindAllParticipatingUnitUseCase {
  constructor(
    private readonly findAllParticipatingUnitRepository: FindAllParticipatingUnitRepository,
    private readonly logger: Logger,
  ) {}

  async execute() {
    try {
      const participatingUnits =
        await this.findAllParticipatingUnitRepository.findAll();

      if (participatingUnits.length === 0) {
        this.logger.error(
          'Error finding Participating Units',
          FindAllParticipatingUnitUseCase.name,
        );
        throw new NotFoundException('Not found any Participating Units');
      }
      this.logger.log(
        'Found Participating Units',
        FindAllParticipatingUnitUseCase.name,
      );

      return participatingUnits;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding all Participating Unit',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
