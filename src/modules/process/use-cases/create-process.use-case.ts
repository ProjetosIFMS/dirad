import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateProcessRepository } from '../repository';
import { CreateProcessDto } from '../dto/create-process.dto';

@Injectable()
export class CreateProcessUseCase {
  constructor(
    private readonly createProcessRepository: CreateProcessRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateProcessDto) {
    try {
      const createdProcess =
        await this.createProcessRepository.createProcess(data);

      this.logger.log('Process created', CreateProcessUseCase.name);

      return createdProcess;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating process',
      });
      this.logger.log(error.message);
      throw err;
    }
  }
}
