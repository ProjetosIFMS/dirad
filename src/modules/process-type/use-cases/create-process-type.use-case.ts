import { CreateProcessTypeDto } from './../dto/create-process-type.dto';
import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateProcessTypeRepository } from '../repository/create-process-type.repository';

@Injectable()
export class CreateProcessTypeUseCase {
  constructor(
    private readonly processTypeRepository: CreateProcessTypeRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateProcessTypeDto) {
    try {
      const processType = await this.processTypeRepository.create(data);
      this.logger.log('Process Type Created', CreateProcessTypeUseCase.name);
      return processType;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating process type',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
