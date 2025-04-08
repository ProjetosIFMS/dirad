import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindProcessByIdRepository } from '../repository';

@Injectable()
export class FindProcessByIdUseCase {
  constructor(
    private readonly findProcessByIdRepository: FindProcessByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(process_id: string) {
    try {
      const processExists =
        await this.findProcessByIdRepository.findById(process_id);

      if (!processExists) {
        this.logger.error('Process not found', FindProcessByIdUseCase.name);
        throw new NotFoundException('Process not found');
      }

      this.logger.log('Process found', FindProcessByIdUseCase.name);

      return processExists;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding process',
      });
      this.logger.log(error.message);
      throw err;
    }
  }
}
