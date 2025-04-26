import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  FindAllProcessesRepository,
  FindProcessByParticipatingUnitRepository,
  FindProcessByUnitRepository,
} from '../repository';
import { FindProcessByShortNamesRepository } from '../repository/find-process-by-shortnames-unit.repository';

@Injectable()
export class FindAllProcessesUseCase {
  constructor(
    private readonly findAllProcessesRepository: FindAllProcessesRepository,
    private readonly findProcessByUnitRepository: FindProcessByUnitRepository,
    private readonly findProcessByParticipatingUnitRepository: FindProcessByParticipatingUnitRepository,
    private readonly findProcessByShortNamesRepository: FindProcessByShortNamesRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    page: number,
    perPage: number,
    UnitShortName?: string,
    participatingUnitShortName?: string,
  ) {
    try {
      if (UnitShortName && participatingUnitShortName) {
        const unitExists =
          await this.findProcessByShortNamesRepository.listByUnitShortNames(
            UnitShortName,
            participatingUnitShortName,
          );
        if (!unitExists) {
          this.logger.error('Unit not found');
          throw new NotFoundException('Unit not found');
        }
        this.logger.log(
          'Processes ShortNames found',
          FindAllProcessesUseCase.name,
        );
        return unitExists;
      }

      if (UnitShortName) {
        const unitExists =
          await this.findProcessByUnitRepository.listByUnitShortName(
            UnitShortName,
          );
        if (!unitExists) {
          this.logger.error('Unit not found');
          throw new NotFoundException('Unit not found');
        }
        this.logger.log('Processes found', FindAllProcessesUseCase.name);
        return unitExists;
      }

      if (participatingUnitShortName) {
        const PunitExists =
          await this.findProcessByParticipatingUnitRepository.listByParticipatingUnitShortName(
            participatingUnitShortName,
          );
        if (!PunitExists) {
          this.logger.error('Unit not found');
          throw new NotFoundException('Unit not found');
        }
        this.logger.log('Processes found', FindAllProcessesUseCase.name);
        return PunitExists;
      }

      const processes = await this.findAllProcessesRepository.findProcesses(
        page,
        perPage,
      );
      this.logger.log('Processes found', FindAllProcessesUseCase.name);

      return processes;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding processes',
      });
      this.logger.log(error.message);
      throw err;
    }
  }
}
