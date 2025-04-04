import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateStepRepository } from '../repository/update-step.repository';
import { FindStepRepository } from '../repository/find-step.repository';
import { UpdateStepDto } from '../dto/update-step.dto';

@Injectable()
export class UpdateStepUseCase {
  constructor(
    private readonly UpdateStepRepository: UpdateStepRepository,
    private readonly FindStepRepository: FindStepRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateStepDto) {
    try {
      const stepExist = await this.FindStepRepository.FindStepById(id);
      if (!stepExist) {
        const error = new NotFoundException('Step not found');
        this.logger.error(error.message);
        throw error;
      }
      const step = await this.UpdateStepRepository.updateStep(id, data);

      this.logger.log('Step updated', UpdateStepUseCase.name);
      return step;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating Step',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
