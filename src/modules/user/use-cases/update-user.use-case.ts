import { Prisma } from '@prisma/client';
import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { UpdateUserRepository } from '../repository/update-user.repository';
import { FindUserByIdRepository } from '../repository/find-user-by-id.repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(id: string, data: Prisma.UserUpdateInput) {
    try {
      const userExists = await this.findUserByIdRepository.findUserById(id);
      if (!userExists) {
        const error = new NotFoundException('User not found');
        this.logger.error(error.message);
        throw error;
      }

      const user = await this.updateUserRepository.updateUser(id, data);
      this.logger.log('User updated', UpdateUserUseCase.name);
      return user;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad Happened', {
        cause: err,
        description: 'Error updating user',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
