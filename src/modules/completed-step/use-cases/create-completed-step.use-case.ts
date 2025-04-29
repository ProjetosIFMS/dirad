import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateCompletedStepRepository } from '../repository/create-completed-step.repository';
import { CreateCompletedStepDto } from '../dto/create-completed-step.dto';

@Injectable()
export class CreateCompletedStepUseCase {
  constructor(
    private readonly CompletedStepRepository: CreateCompletedStepRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateCompletedStepDto) {
    try {
      const completedStep = await this.CompletedStepRepository.create(data);
      this.logger.log(
        'Completed Step Created',
        CreateCompletedStepUseCase.name,
      );
      return completedStep;
    } catch (err) {
      const error = new ServiceUnavailableException({
        message: 'Failed to create completed step',
        cause: err,
        description: `Error creating Completed Step: ${err.message || 'Unknown error occurred'}`,
      });
      this.logger.error(error.message, err.stack);
      throw error;
    }
  }
}
