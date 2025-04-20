import { Test, TestingModule } from '@nestjs/testing';
import { ModalityController } from '../modality.controller';
import { ModalityService } from '../modality.service';
import {
  CreateModalityUseCase,
  DeleteModalityUseCase,
  FindModalityByIdUseCase,
  FindModalityUseCase,
  UpdateModalityUseCase,
} from '../use-cases';

describe('ModalityController', () => {
  let controller: ModalityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModalityController],
      providers: [
        ModalityService,
        {
          provide: CreateModalityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindModalityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindModalityByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateModalityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteModalityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ModalityController>(ModalityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
