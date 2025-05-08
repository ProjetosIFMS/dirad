import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  FindAllProcessesRepository,
  FindProcessNumberRepository,
} from '../repository';
import { Status } from '../types/Status';
import { FindProcessByFiltersRepository } from '../repository/find-process-by-filters.repository';

@Injectable()
export class FindAllProcessesUseCase {
  constructor(
    private readonly findAllProcessesRepository: FindAllProcessesRepository,
    private readonly findProcessByFiltersRepository: FindProcessByFiltersRepository,
    private readonly findProcessByProcessNumberRepository: FindProcessNumberRepository,
    private readonly logger: Logger,
  ) {}

  async execute(
    page: number,
    perPage: number,
    unitShortName?: string,
    participatingUnitShortName?: string,
    status?: Status,
    modality?: string,
    processType?: string,
    object?: string,
    processNumber?: string,
    startDate?: string,
    expectedEndDate?: string,
  ) {
    try {
      const startDateObj = startDate ? new Date(startDate) : undefined;
      const expectedEndDateObj = expectedEndDate
        ? new Date(expectedEndDate)
        : undefined;

      const filters = {
        unitShortName,
        participatingUnitShortName,
        status,
        modality,
        processType,
        object,
        startDate: startDateObj,
        expectedEndDate: expectedEndDateObj,
      };

      if (processNumber) {
        const processExists =
          await this.findProcessByProcessNumberRepository.findProcessNumber(
            processNumber,
          );

        if (!processExists) {
          this.logger.error('Process not found', FindAllProcessesUseCase.name);
          throw new NotFoundException('Process not found');
        }

        this.logger.log('Process found', FindAllProcessesUseCase.name);
        return processExists;
      }

      if (Object.values(filters).some((value) => value !== undefined)) {
        const filterProcess =
          await this.findProcessByFiltersRepository.findProcessByFilters(
            page,
            perPage,
            unitShortName,
            participatingUnitShortName,
            status,
            modality,
            processType,
            object,
            startDateObj,
            expectedEndDateObj,
          );
        if (filterProcess.data.length === 0) {
          this.logger.error('No processes found for the given filters');
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
      if (
        err.name === 'PrismaClientValidationError' ||
        err.name === 'PrismaClientKnownRequestError'
      ) {
        throw new BadRequestException('Parâmetro inválido ou mal formatado.');
      }
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding processes',
      });
      this.logger.log(error.message);
      throw err;
    }
  }
}
