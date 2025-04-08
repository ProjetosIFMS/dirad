import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllProcessesRepository } from '../repository';

@Injectable()
export class FindAllProcessesUseCase {
  constructor(
    private readonly findAllProcessesRepository: FindAllProcessesRepository,
    private readonly logger: Logger,
  ) {}

  async execute() {
    try {
      const processes = await this.findAllProcessesRepository.findProcesses();

      if (processes.length === 0) {
        this.logger.error('Process not found', FindAllProcessesUseCase.name);
        throw new NotFoundException('Not found any process');
      }

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
