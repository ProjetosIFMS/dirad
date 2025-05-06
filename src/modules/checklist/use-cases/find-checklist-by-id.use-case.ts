import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindCheckListByIdRepository } from '../repository/find-checklist-by-id.repository';

@Injectable()
export class FindChecklistByIdUseCase {
  constructor(
    private readonly checklisRepository: FindCheckListByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}
  async execute(id: string, includeStep = false) {
    try {
      const checklists = await this.checklisRepository.findById(
        id,
        includeStep,
      );
      if (!checklists) {
        throw new NotFoundException(
          'No checklists found',
          FindChecklistByIdUseCase.name,
        );
      }
      return checklists;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error finding checklists',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
