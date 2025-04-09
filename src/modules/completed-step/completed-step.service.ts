import { Injectable } from '@nestjs/common';
import { CreateCompletedStepDto } from './dto/create-completed-step.dto';
import { UpdateCompletedStepDto } from './dto/update-completed-step.dto';
import {
  CreateCompletedStepUseCase,
  FindAllCompletedStepUseCase,
  FindCompletedStepByIdUseCase,
  UpdateCompletedStepUseCase,
} from './use-cases';
import { DeleteCompletedStepUseCase } from './use-cases/delete-completed-step.use-case';

@Injectable()
export class CompletedStepService {
  constructor(
    private readonly CreateCompletedStepUseCase: CreateCompletedStepUseCase,
    private readonly FindAllCompletedStepUseCase: FindAllCompletedStepUseCase,
    private readonly FindCompletedStepUseCase: FindCompletedStepByIdUseCase,
    private readonly UpdateCompletedStepUseCase: UpdateCompletedStepUseCase,
    private readonly DeleteCompletedStepUseCase: DeleteCompletedStepUseCase,
  ) {}

  async create(data: CreateCompletedStepDto) {
    return await this.CreateCompletedStepUseCase.execute(data);
  }

  async findAll() {
    return await this.FindAllCompletedStepUseCase.execute();
  }

  async findOne(id: string) {
    return await this.FindCompletedStepUseCase.execute(id);
  }

  async update(id: string, data: UpdateCompletedStepDto) {
    return await this.UpdateCompletedStepUseCase.execute(id, data);
  }

  async remove(id: string) {
    return await this.DeleteCompletedStepUseCase.execute(id);
  }
}
