import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateChecklistRepository } from '../repository/create-checklist.repository';
import { CreateChecklistDto } from '../dto/create-checklist.dto';

@Injectable()
export class CreateChecklistUseCase {
  constructor(
    private readonly checklistRepository: CreateChecklistRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateChecklistDto) {
    try {
      const checklist = await this.checklistRepository.create(data);
      this.logger.log('Checklist Created', CreateChecklistUseCase.name);
      return checklist;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating checklist',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
