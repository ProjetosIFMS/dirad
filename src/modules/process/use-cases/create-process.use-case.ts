import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  CreateProcessRepository,
  UpdateProcessRepository,
} from '../repository';
import { CreateProcessDto } from '../dto/create-process.dto';
import {
  CreateChecklistRepository,
  FindIfChecklistVinculatedRepository,
} from 'src/modules/checklist/repository';
import { FindProcessNumberRepository } from '../repository/find-process-number.repository';

@Injectable()
export class CreateProcessUseCase {
  constructor(
    private readonly createProcessRepository: CreateProcessRepository,
    private readonly findIfChecklistVinculatedRepository: FindIfChecklistVinculatedRepository,
    private readonly createChecklistRepository: CreateChecklistRepository,
    private readonly findProcessNumberRepository: FindProcessNumberRepository,
    private readonly updateProcessRepository: UpdateProcessRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateProcessDto) {
    try {
      const processNumberExists =
        await this.findProcessNumberRepository.findProcessNumber(
          data.processNumber,
        );

      if (processNumberExists) {
        this.logger.error(
          'Process number already exists',
          CreateProcessUseCase.name,
        );
        const error = new ConflictException('Process number already exists');
        throw error;
      }

      if (data.checklistId) {
        const isVinculated =
          await this.findIfChecklistVinculatedRepository.findIfVinculated(
            data.checklistId,
          );
        if (isVinculated) {
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

      const processChecklist = await this.createChecklistRepository.create({
        processId: createdProcess.id,
      });

      const processWithChecklist =
        await this.updateProcessRepository.updateProcess(createdProcess.id, {
          checklistId: processChecklist.id,
        });

      this.logger.log('Process created', CreateProcessUseCase.name);

      return processWithChecklist;
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
