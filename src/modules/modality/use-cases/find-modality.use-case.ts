import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindModalityRepository } from '../repository/find-modality.repository';

@Injectable()
export class FindModalityUseCase {
  constructor(
    private readonly ModalityRepository: FindModalityRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const modality = await this.ModalityRepository.findAllModality();
      this.logger.log('Modality found', FindModalityUseCase.name);
      return modality;
    } catch (err) {
      const error = new ServiceUnavailableException('Something Bad Happened!', {
        cause: err,
        description: 'Modality not found!',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
