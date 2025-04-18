import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateModalityRepository } from '../repository/create-modality.repository';
import { CreateModalityInput } from '../inputs/create-modality.input';

@Injectable()
export class CreateModalityUseCase {
  constructor(
    private readonly ModalityRepository: CreateModalityRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateModalityInput) {
    try {
      const modality = await this.ModalityRepository.create(data);
      this.logger.log('Modality Created', CreateModalityUseCase.name);
      return modality;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened!', {
        cause: err,
        description: 'Error creating Modality',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
