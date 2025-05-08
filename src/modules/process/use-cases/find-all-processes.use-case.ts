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
import { FindProcessByStatusRepository } from '../repository/find-process-by-status.repository';
import { Status } from '../types/Status';
import { FindProcessByFiltersRepository } from '../repository/find-process-by-filters.repository';

@Injectable()
export class FindAllProcessesUseCase {
  constructor(
    private readonly findAllProcessesRepository: FindAllProcessesRepository,
    private readonly findProcessByUnitRepository: FindProcessByUnitRepository,
    private readonly findProcessByParticipatingUnitRepository: FindProcessByParticipatingUnitRepository,
    private readonly findProcessByShortNamesRepository: FindProcessByShortNamesRepository,
    private readonly findProcessByStatusRepository: FindProcessByStatusRepository,
    private readonly findProcessByFiltersRepository: FindProcessByFiltersRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    page: number,
    perPage: number,
    unitShortName?: string,
    participatingUnitShortName?: string,
    status?: string,
    modality?: string,
    processType?: string,
    object?: string,
    startDate?: string,
    expectedEndDate?: string,
  ) {
    try {
      const statusEnum =
        status && Object.values(Status).includes(status as Status)
          ? (status as Status)
          : undefined;

      const startDateObj = startDate ? new Date(startDate) : undefined;
      const expectedEndDateObj = expectedEndDate
        ? new Date(expectedEndDate)
        : undefined;

      const filters = {
        unitShortName,
        participatingUnitShortName,
        status: statusEnum,
        modality,
        processType,
        object,
        startDate: startDateObj,
        expectedEndDate: expectedEndDateObj,
      };

      // if (unitShortName && participatingUnitShortName) {
      //   const unitExists =
      //     await this.findProcessByShortNamesRepository.listByUnitShortNames(
      //       unitShortName,
      //       participatingUnitShortName,
      //       page,
      //       perPage,
      //     );
      //   if (!unitExists) {
      //     this.logger.error('Unit not found');
      //     throw new NotFoundException('Unit not found');
      //   }
      //   this.logger.log(
      //     'Processes ShortNames found',
      //     FindAllProcessesUseCase.name,
      //   );
      //   return unitExists;
      // }

      // if (unitShortName) {
      //   const unitExists =
      //     await this.findProcessByUnitRepository.listByUnitShortName(
      //       unitShortName,
      //       page,
      //       perPage,
      //     );
      //   if (!unitExists) {
      //     this.logger.error('Unit not found');
      //     throw new NotFoundException('Unit not found');
      //   }
      //   this.logger.log('Processes found', FindAllProcessesUseCase.name);
      //   return unitExists;
      // }

      // if (participatingUnitShortName) {
      //   const PunitExists =
      //     await this.findProcessByParticipatingUnitRepository.listByParticipatingUnitShortName(
      //       participatingUnitShortName,
      //       page,
      //       perPage,
      //     );
      //   if (!PunitExists) {
      //     this.logger.error('Unit not found');
      //     throw new NotFoundException('Unit not found');
      //   }
      //   this.logger.log('Processes found', FindAllProcessesUseCase.name);
      //   return PunitExists;
      // }

      // if (status) {
      //   const statusExists =
      //     await this.findProcessByStatusRepository.listProcessByStatus(
      //       status,
      //       unitShortName,
      //       page,
      //       perPage,
      //     );
      //   if (!statusExists || (Array.isArray(statusExists) && statusExists.length === 0)) {
      //     this.logger.error('No processes found for the given status');
      //     throw new NotFoundException('No processes found for the given status');
      //   }
      //   this.logger.log('Processes found', FindAllProcessesUseCase.name);
      //   return statusExists;
      // }

      if (filters) {
        const filterProcess =
          await this.findProcessByFiltersRepository.findProcessByFilters(
            page,
            perPage,
            unitShortName,
            participatingUnitShortName,
            statusEnum,
            modality,
            processType,
            object,
            startDateObj,
            expectedEndDateObj,
          );
        if (filterProcess.data.length === 0) {
          this.logger.error('No processes found for the given filters');
          throw new NotFoundException(
            'No processes found for the given filters',
          );
        }
        this.logger.log(
          'Processes filtered found',
          FindAllProcessesUseCase.name,
        );
        return filterProcess;
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
