import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  DeleteProcessRepository,
  FindProcessByIdRepository,
} from '../repository';

@Injectable()
export class DeleteProcessUseCase {
  constructor(
    private readonly deleteProcessRepository: DeleteProcessRepository,
    private readonly findProcessByIdRepository: FindProcessByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(process_id: string) {
    try {
      const processExists =
        await this.findProcessByIdRepository.findById(process_id);

      if (!processExists) {
        this.logger.error('Process not found', DeleteProcessUseCase.name);
        throw new NotFoundException('Process not found');
      }

      const deletedProcess =
        await this.deleteProcessRepository.deleteProcess(process_id);

      this.logger.log('Process deleted', DeleteProcessUseCase.name);

      return deletedProcess;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting process',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
