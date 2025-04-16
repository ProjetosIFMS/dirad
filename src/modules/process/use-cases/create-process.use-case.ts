import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateProcessRepository } from '../repository';
import { CreateProcessDto } from '../dto/create-process.dto';
import { FindIfChecklistVinculatedRepository } from 'src/modules/checklist/repository';

@Injectable()
export class CreateProcessUseCase {
  constructor(
    private readonly createProcessRepository: CreateProcessRepository,
    private readonly findIfChecklistVinculatedRepository: FindIfChecklistVinculatedRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateProcessDto) {
    try {
      if (data.checklistId) {
        const hasVinculated =
          await this.findIfChecklistVinculatedRepository.findIfVinculated(
            data.checklistId,
          );

        if (hasVinculated) {
          this.logger.error(
            'Checklist already vinculated in an process',
            CreateProcessUseCase.name,
          );
          const error = new ConflictException(
            'Checklist already vinculated in an process',
          );
          throw error;
        }
      }

      const createdProcess =
        await this.createProcessRepository.createProcess(data);

      this.logger.log('Process created', CreateProcessUseCase.name);

      return createdProcess;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating process',
      });
      this.logger.error(error.message, CreateProcessUseCase.name);
      throw err;
    }
  }
}
