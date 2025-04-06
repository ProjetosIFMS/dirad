import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  DeleteProcessTypeRepository,
  FindProcessTypeByIdRepository,
} from '../repository';

@Injectable()
export class DeleteProcessTypeUseCase {
  constructor(
    private readonly processTypeRepository: DeleteProcessTypeRepository,
    private readonly findProcessTypeByIdRepository: FindProcessTypeByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const processTypeExists =
        await this.findProcessTypeByIdRepository.findById(id);
      if (!processTypeExists) {
        throw new NotFoundException('Process type not found');
      }

      const processType = await this.processTypeRepository.delete(id);
      this.logger.log('Process Type deleted', DeleteProcessTypeUseCase.name);
      return processType;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error deleting process type',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
