import {
  Logger,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindStepRepository } from '../repository/find-step.repository';

@Injectable()
export class FindStepByIdUseCase {
  constructor(
    private readonly findStepById: FindStepRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const stepExist = await this.findStepById.FindStepById(id);

      if (!stepExist) {
        const error = new NotFoundException('Step not found');
        this.logger.error(error.message);
        throw error;
      }
      this.logger.log('Step found', FindStepRepository.name);
      return stepExist;
    } catch (err) {
      new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding Step',
      });
      this.logger.error(err.message);
      throw err;
    }
  }
}
