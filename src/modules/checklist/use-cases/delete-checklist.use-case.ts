import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  DeleteChecklistRepository,
  FindCheckListByIdRepository,
} from '../repository';

@Injectable()
export class DeleteChecklistUseCase {
  constructor(
    private readonly checklistRepository: DeleteChecklistRepository,
    private readonly findChecklistRepository: FindCheckListByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const checklistExists = await this.findChecklistRepository.findById(id);
      if (!checklistExists) {
        throw new NotFoundException('Checklist not found');
      }

      const checklist = await this.checklistRepository.delete(id);
      this.logger.log('Checklist Deleted', DeleteChecklistUseCase.name);
      return checklist;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting checklist',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
