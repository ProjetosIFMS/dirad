import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteStepRepository, FindStepByIdRepository } from '../repository';

@Injectable()
export class DeleteStepUseCase {
  constructor(
    private readonly StepRepository: DeleteStepRepository,
    private readonly FindStepByIdRepository: FindStepByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const stepExist = await this.FindStepByIdRepository.FindById(id);
      if (!stepExist) {
        throw new NotFoundException('Step not found');
      }

      const step = await this.StepRepository.delete(id);
      this.logger.log('Step deleted.', DeleteStepUseCase.name);
      return step;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting Step',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
