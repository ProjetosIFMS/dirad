import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  FindProcessTypeByIdRepository,
  UpdateProcessTypeRepository,
} from '../repository';
import { UpdateProcessTypeDto } from '../dto/update-process-type.dto';

@Injectable()
export class UpdateProcessTypeUseCase {
  constructor(
    private readonly processTypeRepository: UpdateProcessTypeRepository,
    private readonly findProcessTypeByIdRepository: FindProcessTypeByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateProcessTypeDto) {
    try {
      const processTypeExists =
        await this.findProcessTypeByIdRepository.findById(id);
      if (!processTypeExists) {
        throw new NotFoundException('Process type not found');
      }

      const processType = await this.processTypeRepository.update(id, data);
      this.logger.log('Process Type updated', UpdateProcessTypeUseCase.name);
      return processType;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error updating process type',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
