import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  FindCheckListByIdRepository,
  UpdateChecklistRepository,
} from '../repository';
import { UpdateChecklistDto } from '../dto/update-checklist.dto';

@Injectable()
export class UpdateChecklistUseCase {
  constructor(
    private readonly checklistRepository: UpdateChecklistRepository,
    private readonly findCheckListByIdRepository: FindCheckListByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateChecklistDto) {
    try {
      const checklistExists =
        await this.findCheckListByIdRepository.findById(id);
      if (!checklistExists) {
        throw new NotFoundException('Checklist not found');
      }

      const updatedChecklist = await this.checklistRepository.update(id, data);
      this.logger.log('Checklist updated', UpdateChecklistUseCase.name);
      return updatedChecklist;
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
