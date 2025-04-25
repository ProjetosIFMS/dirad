import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateSectorRepository } from '../repository';
import { CreateSectorDto } from '../dto/create-sector.dto';

@Injectable()
export class CreateSectorUseCase {
  constructor(
    private readonly SectorRepository: CreateSectorRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateSectorDto) {
    try {
      const sector = await this.SectorRepository.create(data);
      this.logger.log('Sector Created', CreateSectorUseCase.name);
      return sector;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating Sector',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
