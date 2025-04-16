import { Injectable } from '@nestjs/common';
import {
  CreateModalityUseCase,
  DeleteModalityUseCase,
  FindModalityByIdUseCase,
  FindModalityUseCase,
  UpdateModalityUseCase,
} from './use-cases';
import { CreateModalityInput } from './inputs/create-modality.input';
import { UpdateModalityInput } from './inputs/update-modality.input';

@Injectable()
export class ModalityService {
  constructor(
    private readonly CreateModalityUseCase: CreateModalityUseCase,
    private readonly FindAllModalityUseCase: FindModalityUseCase,
    private readonly FindModalityByIdUseCase: FindModalityByIdUseCase,
    private readonly UpdateModalityUseCase: UpdateModalityUseCase,
    private readonly DeleteModalityUseCase: DeleteModalityUseCase,
  ) {}

  async create(data: CreateModalityInput) {
    return await this.CreateModalityUseCase.execute(data);
  }

  async findAll() {
    return await this.FindAllModalityUseCase.execute();
  }

  async findOne(id: string) {
    return await this.FindModalityByIdUseCase.execute(id);
  }

  async update(id: string, data: UpdateModalityInput) {
    return await this.UpdateModalityUseCase.execute(id, data);
  }

  async remove(id: string) {
    return await this.DeleteModalityUseCase.execute(id);
  }
}
