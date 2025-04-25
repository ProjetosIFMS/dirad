import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  FindSectorByIdRepository,
  UpdateSectorRepository,
} from '../repository';
import { UpdateSectorDto } from '../dto/update-sector.dto';

@Injectable()
export class UpdateSectorUseCase {
  constructor(
    private readonly SectorRepository: UpdateSectorRepository,
    private readonly FindSectorByIdRepository: FindSectorByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: UpdateSectorDto) {
    try {
      const sectorExists = await this.FindSectorByIdRepository.findById(id);
      if (!sectorExists) {
        this.logger.error('Sector not found', UpdateSectorUseCase.name);
        throw new NotFoundException('Sector not found!');
      }
      const sector = await this.SectorRepository.update(id, data);
      this.logger.log('Sector updated', UpdateSectorUseCase.name);
      return sector;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error updating sector',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
