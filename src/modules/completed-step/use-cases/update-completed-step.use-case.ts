import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  FindCompletedStepByIdRepository,
  UpdateCompletedStepRepository,
} from '../repository';
import { UpdateCompletedStepDto } from '../dto/update-completed-step.dto';

@Injectable()
export class UpdateCompletedStepUseCase {
  constructor(
    private readonly CompletedStepRepository: UpdateCompletedStepRepository,
    private readonly FindCompletedStepByIdRepository: FindCompletedStepByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateCompletedStepDto) {
    try {
      const completedStepExists =
        await this.FindCompletedStepByIdRepository.findById(id);
      if (!completedStepExists) {
        throw new NotFoundException('Completed Step Not Found');
      }

      const completedStep = await this.CompletedStepRepository.update(id, data);
      this.logger.log(
        'Completed Step Updated',
        UpdateCompletedStepUseCase.name,
      );
      return completedStep;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating completed step',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
