import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  FindProcessByIdRepository,
  UpdateProcessRepository,
} from '../repository';
import { UpdateProcessDto } from '../dto/update-process.dto';

@Injectable()
export class UpdateProcessUseCase {
  constructor(
    private readonly updateProcessRepository: UpdateProcessRepository,
    private readonly findProcessByIdRepository: FindProcessByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(process_id: string, data: UpdateProcessDto) {
    try {
      const processExists =
        await this.findProcessByIdRepository.findById(process_id);

      if (!processExists) {
        this.logger.error('Process not found', UpdateProcessUseCase.name);
        throw new NotFoundException('Process not found');
      }

      const updatedProcess = await this.updateProcessRepository.updateProcess(
        process_id,
        data,
      );

      this.logger.log('Process updated', UpdateProcessUseCase.name);

      return updatedProcess;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating process',
      });
      this.logger.log(error.message);
      throw err;
    }
  }
}
