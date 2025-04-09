import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindCompletedStepByIdRepository } from '../repository';

@Injectable()
export class FindCompletedStepByIdUseCase {
  constructor(
    private readonly CompletedStepRepository: FindCompletedStepByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const completedStep = await this.CompletedStepRepository.findById(id);
      if (!completedStep) {
        throw new NotFoundException('Completed Step not found');
      }
      this.logger.log(
        'Completed Step Found',
        FindCompletedStepByIdUseCase.name,
      );
      return completedStep;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding completed step',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
