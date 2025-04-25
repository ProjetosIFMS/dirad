import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindSectorByIdRepository } from '../repository';

@Injectable()
export class FindSectorByIdUseCase {
  constructor(
    private readonly SectorRepository: FindSectorByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const sector = await this.SectorRepository.findById(id);
      if (!sector) {
        this.logger.error('Sector not found', FindSectorByIdUseCase.name);
        throw new NotFoundException('Sector not found!');
      }
      this.logger.log('Sector Found', FindSectorByIdUseCase.name);
      return sector;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding sector',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
