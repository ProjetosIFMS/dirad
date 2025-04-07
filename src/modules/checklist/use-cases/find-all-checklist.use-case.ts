import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllChecklistRepository } from '../repository';

@Injectable()
export class FindAllChecklistUseCase {
  constructor(
    private readonly checklisRepository: FindAllChecklistRepository,
    private readonly logger: Logger = new Logger(),
  ) {}
  async execute() {
    try {
      const checklists = await this.checklisRepository.findAll();
      if (!checklists) {
        throw new NotFoundException(
          'No checklists found',
          FindAllChecklistUseCase.name,
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
