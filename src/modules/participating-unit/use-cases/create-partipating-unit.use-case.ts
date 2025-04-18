import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateParticipatingUnitRepository } from '../repository/create-participating-unit.repository';
import { CreateParticipatingUnitDto } from '../dto/create-participating-unit.dto';

@Injectable()
export class CreateParticipatingUnitUseCase {
  constructor(
    private readonly createParticipatingUnitRepository: CreateParticipatingUnitRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateParticipatingUnitDto) {
    try {
      const participatingUnit =
        await this.createParticipatingUnitRepository.create(data);
      this.logger.log(
        'Participating Unit created',
        CreateParticipatingUnitUseCase.name,
      );

      return participatingUnit;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating Participating Unit',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
