import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  DeleteCompletedStepRepository,
  FindCompletedStepByIdRepository,
} from '../repository';

@Injectable()
export class DeleteCompletedStepUseCase {
  constructor(
    private readonly CompletedStepRepository: DeleteCompletedStepRepository,
    private readonly FindCompletedStepRepository: FindCompletedStepByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const completedStepExists = this.FindCompletedStepRepository.findById(id);

      if (!completedStepExists) {
        throw new NotFoundException('Completed Step not found!');
      }

      const completedStep = await this.CompletedStepRepository.delete(id);
      this.logger.log(
        'Completed Step deleted',
        DeleteCompletedStepUseCase.name,
      );
      return completedStep;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting Completed Step',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
