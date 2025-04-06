import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateStepRepository } from '../repository/create-step.repository';
import { CreateStepDto } from '../dto/create-step.dto';

@Injectable()
export class CreateStepUseCase {
  constructor(
    private readonly StepRepository: CreateStepRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateStepDto) {
    try {
      const step = await this.StepRepository.create(data);
      this.logger.log('Step Created', CreateStepUseCase.name);
      return step;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating Step',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
