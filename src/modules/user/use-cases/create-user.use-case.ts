import {
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserRepository } from '../repository/create-user.repository';
import { FindUserByEmailRepository } from '../repository/find-user-by-email.repository';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly logger: Logger = new Logger(),
  ) {}

  async execute(data: CreateUserDTO) {
    try {
      const userExists = await this.findUserByEmailRepository.findUserByEmail(
        data.email,
      );
      if (userExists) {
        throw new ConflictException('User already exists');
      }

      const user = await this.createUserRepository.createUser(data);
      this.logger.log('User created', CreateUserUseCase.name);
      return user;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating user',
      });
      this.logger.error(error.message);
      throw error;
    }
  }
}
