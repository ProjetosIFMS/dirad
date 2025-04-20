import { Test, TestingModule } from '@nestjs/testing';
import { ModalityService } from '../modality.service';
import {
  CreateModalityUseCase,
  DeleteModalityUseCase,
  FindModalityByIdUseCase,
  FindModalityUseCase,
  UpdateModalityUseCase,
} from '../use-cases';

describe('ModalityService', () => {
  let service: ModalityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ModalityService>(ModalityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
