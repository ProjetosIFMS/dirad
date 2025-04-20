import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            findAll: jest.fn(),
            findUserById: jest.fn(),
            FindUserByEmail: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service createUser', async () => {
    const createDto = {
      id: 'user-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      picture: 'profile.jpg',
      createdAt: '2025-04-20T00:00:00.000Z',
      updatedAt: new Date().toISOString(),
    };
    const mockResponse = {
      ...createDto,
      createdAt: new Date('2025-04-20T00:00:00.000Z'),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'createUser').mockResolvedValue(mockResponse);
    expect(await controller.create(createDto)).toEqual(mockResponse);
    expect(service.createUser).toHaveBeenCalledWith(createDto);
  });

  it('should call service findAll', async () => {
    const users = [
      {
        id: 'user-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        picture: 'profile.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(users);
    expect(await controller.findAll()).toEqual(users);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service findById', async () => {
    const id = 'user-1';
    const user = {
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      picture: 'profile.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'findUserById').mockResolvedValue(user);
    expect(await controller.findById(id)).toEqual(user);
    expect(service.findUserById).toHaveBeenCalledWith(id);
  });

  it('should call service findByEmail', async () => {
    const email = 'john.doe@example.com';
    const user = {
      id: 'user-1',
      firstName: 'John',
      lastName: 'Doe',
      email,
      password: 'password123',
      picture: 'profile.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'FindUserByEmail').mockResolvedValue(user);
    expect(await controller.findByEmail(email)).toEqual(user);
    expect(service.FindUserByEmail).toHaveBeenCalledWith(email);
  });

  it('should call service update', async () => {
    const id = 'user-1';
    const updateData = {
      firstName: 'Updated',
      lastName: 'Name',
    };
    const updatedUser = {
      id,
      ...updateData,
      email: 'john.doe@example.com',
      password: 'password123',
      picture: 'profile.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'updateUser').mockResolvedValue(updatedUser);
    expect(await controller.update(id, updateData)).toEqual(updatedUser);
    expect(service.updateUser).toHaveBeenCalledWith(id, updateData);
  });

  it('should call service remove', async () => {
    const id = 'user-1';
    jest.spyOn(service, 'deleteUser').mockResolvedValue(undefined);
    await controller.remove(id);
    expect(service.deleteUser).toHaveBeenCalledWith(id);
  });
});
