import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateStepRepository, FindStepByIdRepository } from '../repository';
import { UpdateStepDto } from '../dto/update-step.dto';

@Injectable()
export class UpdateStepUseCase {
  constructor(
    private readonly StepRepository: UpdateStepRepository,
    private readonly findStepByIdRepository: FindStepByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateStepDto) {
    try {
      const stepExist = await this.findStepByIdRepository.FindById(id);
      if (!stepExist) {
        throw new NotFoundException('Step not found');
      }

      const step = await this.StepRepository.update(id, data);
      this.logger.log('Step updated', UpdateStepUseCase.name);
      return step;
    } catch (err) {
      const error = new ServiceUnavailableException({
        message: 'Failed to update step',
        cause: err,
        description: `Error updating Step: ${err.message || 'Unknown error occurred'}`,
      });
      this.logger.error(error.message, err.stack);
      throw error;
    }
  }
}
