import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteStepRepository } from '../repository/delete-step.repository';
import { FindStepRepository } from '../repository/find-step.repository';

@Injectable()
export class DeleteStepUseCase {
  constructor(
    private readonly DeleteStepRepository: DeleteStepRepository,
    private readonly FindStepRepository: FindStepRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const stepExist = await this.FindStepRepository.FindStepById(id);
      if (!stepExist) {
        const error = new NotFoundException('Step not found');
        throw error;
      }
      const step = await this.DeleteStepRepository.deleteStep(id);
      this.logger.log('Step deleted.', DeleteStepRepository.name);
      return step;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting Step',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
