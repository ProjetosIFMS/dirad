import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllParticipatingUnitsByProcessRepository } from '../repository/find-all-participating-units-by-process.repository';

@Injectable()
export class FindAllParticipatingUnitByProcessUseCase {
  constructor(
    private readonly findAllParticipatingUnitRepository: FindAllParticipatingUnitsByProcessRepository,
    private readonly logger: Logger,
  ) {}

  async execute(process_id: string) {
    try {
      const participatingUnits =
        await this.findAllParticipatingUnitRepository.findAllUnits(process_id);

      if (participatingUnits.length === 0) {
        this.logger.error(
          'Error finding Units related to Process',
          FindAllParticipatingUnitByProcessUseCase.name,
        );
        throw new NotFoundException('Not found any Participating Units');
      }
      this.logger.log(
        'Found Participating Units related to Process',
        FindAllParticipatingUnitByProcessUseCase.name,
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
