import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindAllUsersUseCase,
  FindUserByEmailUseCase,
  FindUserByIdUseCase,
  UpdateUserUseCase,
} from '../use-cases';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CreateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindUserByEmailUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindUserByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllUsersUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call createUser use case', async () => {
    const createDto = {
      id: 'user-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      picture: 'profile.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await service.createUser(createDto);
    expect(service['createUserUseCase'].execute).toHaveBeenCalledWith(
      createDto,
    );
  });

  it('should call FindUserByEmail use case', async () => {
    const email = 'john.doe@example.com';
    await service.FindUserByEmail(email);
    expect(service['findUserByEmailUseCase'].execute).toHaveBeenCalledWith(
      email,
    );
  });

  it('should call findAll use case', async () => {
    await service.findAll();
    expect(service['findAllUsersUseCase'].execute).toHaveBeenCalled();
  });

  it('should call findUserById use case', async () => {
    const id = 'user-1';
    await service.findUserById(id);
    expect(service['findUserByIdUseCase'].execute).toHaveBeenCalledWith(id);
  });

  it('should call updateUser use case', async () => {
    const id = 'user-1';
    const updateData = {
      firstName: 'Updated',
      lastName: 'Name',
    };
    await service.updateUser(id, updateData);
    expect(service['updateUserUseCase'].execute).toHaveBeenCalledWith(
      id,
      updateData,
    );
  });

  it('should call deleteUser use case', async () => {
    const id = 'user-1';
    await service.deleteUser(id);
    expect(service['deleteUserUseCase'].execute).toHaveBeenCalledWith(id);
  });
});
