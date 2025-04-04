import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindUserByIdRepository } from '../repository/find-user-by-id.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
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

      this.logger.log('User found', FindUserByIdUseCase.name);
      return userExists;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Users not found');
    }
  }
}
