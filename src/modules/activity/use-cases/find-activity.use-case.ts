import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FindActivityByIdRepository } from '../repository/find-activity.repository';

@Injectable()
export class FindActivityByIdUseCase {
  constructor(
    private readonly findActivitydRepository: FindActivityByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const activityExist = await this.findActivitydRepository.findById(id);
      if (!activityExist) {
        throw new NotFoundException('Activity not found');
      }
      this.logger.log('Activity Found', FindActivityByIdUseCase.name);
      return activityExist;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error finding Actitivty',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
