import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindModalityByIdRepository } from '../repository/find-modality-by-id.repository';

@Injectable()
export class FindModalityByIdUseCase {
  constructor(
    private readonly ModalityRepository: FindModalityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const modalityExists = await this.ModalityRepository.findModalityById(id);
      if (!modalityExists) {
        const error = new NotFoundException('Modality not found');
        this.logger.error(error.message);
        throw error;
      }

      this.logger.log('Modality Found', FindModalityByIdUseCase.name);
      return modalityExists;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened!', {
        cause: err,
        description: 'Modality Not Found!',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
