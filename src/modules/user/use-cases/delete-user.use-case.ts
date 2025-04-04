import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteUserRepository } from '../repository/delete-user.repository';
import { FindUserByIdRepository } from '../repository/find-user-by-id.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly deleteUserRepository: DeleteUserRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string) {
    try {
      const userExists = await this.findUserByIdRepository.findUserById(id);
      if (!userExists) {
        const error = new NotFoundException('User not found');
        this.logger.error(error.message);
        throw error;
      }

      const user = await this.deleteUserRepository.deleteUser(id);
      this.logger.log('User deleted', DeleteUserUseCase.name);
      return user;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error deleting user',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
