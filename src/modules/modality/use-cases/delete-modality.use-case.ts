import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteModalityRepository } from '../repository/delete-modality-repository';
import { FindModalityByIdRepository } from '../repository/find-modality-by-id.repository';

@Injectable()
export class DeleteModalityUseCase {
  constructor(
    private readonly ModalityRepository: DeleteModalityRepository,
    private readonly FindModalityByIdRepository: FindModalityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const modalityExists =
        await this.FindModalityByIdRepository.findModalityById(id);
      if (!modalityExists) {
        throw new NotFoundException('Modality not found!');
      }

      const modality = await this.ModalityRepository.delete(id);
      this.logger.log('Modality Deleted', DeleteModalityUseCase.name);
      return modality;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened!', {
        cause: err,
        description: 'Error deleting modality',
      });
      this.logger.error(error.message);
      throw err;
    }
  }
}
