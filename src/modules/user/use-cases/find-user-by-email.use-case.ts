import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindUserByEmailRepository } from '../repository/find-user-by-email.repository';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(email: string) {
    try {
      const userExists =
        await this.findUserByEmailRepository.findUserByEmail(email);

      if (!userExists) {
        const error = new NotFoundException('User not found');
        this.logger.error(error.message);
        throw error;
      }
      this.logger.log('User found', FindUserByEmailUseCase.name);
      return userExists;
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('User not found');
    }
  }
}
