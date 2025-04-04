import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindAllUsersRepository } from '../repository/find-all-users.repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllUsersRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute() {
    try {
      return await this.findAllUsersRepository.findAllUsers();
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Users not found');
    }
  }
}
