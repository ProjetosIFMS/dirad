import {
  Injectable,
  Logger,
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
