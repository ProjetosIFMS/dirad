import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindAllSectorRepository } from '../repository';

@Injectable()
export class FindAllSectorUseCase {
  constructor(
    private readonly SectorRepository: FindAllSectorRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      const sector = await this.SectorRepository.findAll();
      this.logger.log('Sectors Found', FindAllSectorUseCase.name);
      if (!sector) {
        throw new NotFoundException(
          'No Sectors Found',
          FindAllSectorUseCase.name,
        );
      }
      return sector;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error Finding Sectors',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
