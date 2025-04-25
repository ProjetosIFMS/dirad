import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  DeleteSectorRepository,
  FindSectorByIdRepository,
} from '../repository';

@Injectable()
export class DeleteSectorUseCase {
  constructor(
    private readonly SectorRepository: DeleteSectorRepository,
    private readonly findSectorByIdRepository: FindSectorByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const sectorExists = await this.findSectorByIdRepository.findById(id);
      if (!sectorExists) {
        this.logger.error('Sector not found', DeleteSectorUseCase.name);
        throw new NotFoundException('Sector not found!');
      }
      const sector = await this.SectorRepository.delete(id);
      this.logger.log('Sector deleted', DeleteSectorUseCase.name);
      return sector;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error deleting sector',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
