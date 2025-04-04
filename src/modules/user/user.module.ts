import { Logger, Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CreateUserRepository } from './repository/create-user.repository';
import { DeleteUserRepository } from './repository/delete-user.repository';
import { FindAllUsersRepository } from './repository/find-all-users.repository';
import { FindUserByEmailRepository } from './repository/find-user-by-email.repository';
import { FindUserByIdRepository } from './repository/find-user-by-id.repository';
import { UpdateUserRepository } from './repository/update-user.repository';
import { UserService } from './user.service';
import * as UseCases from './use-cases';
import { UserController } from './user.controller';
import { SharedModule } from '../../shared/shared.module';

const usecases = Object.values(UseCases);

@Module({
  imports: [forwardRef(() => AuthModule), SharedModule],
  controllers: [UserController],
  providers: [
    CreateUserRepository,
    DeleteUserRepository,
    FindAllUsersRepository,
    FindUserByEmailRepository,
    FindUserByIdRepository,
    UpdateUserRepository,
    UserService,
    ...usecases,
    Logger,
  ],
  exports: [
    CreateUserRepository,
    DeleteUserRepository,
    FindAllUsersRepository,
    FindUserByEmailRepository,
    FindUserByIdRepository,
    UpdateUserRepository,
  ],
})
export class UserModule {}
