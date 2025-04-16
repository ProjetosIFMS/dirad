import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateModalityRepository } from '../repository/update-modality.repository';
import { FindModalityByIdRepository } from '../repository/find-modality-by-id.repository';
import { UpdateModalityInput } from '../inputs/update-modality.input';

@Injectable()
export class UpdateModalityUseCase {
  constructor(
    private readonly ModalityRepository: UpdateModalityRepository,
    private readonly FindModalityByIdRepository: FindModalityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateModalityInput) {
    try {
      const modalityExists =
        await this.FindModalityByIdRepository.findModalityById(id);
      if (!modalityExists) {
        throw new NotFoundException('Modality not found');
      }

      const modality = await this.ModalityRepository.update(id, data);
      this.logger.log('Modality updated', UpdateModalityUseCase.name);
      return modality;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating modality',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
