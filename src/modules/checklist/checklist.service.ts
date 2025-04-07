import { Injectable } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import {
  CreateChecklistUseCase,
  DeleteChecklistUseCase,
  FindAllChecklistUseCase,
  FindChecklistByIdUseCase,
  UpdateChecklistUseCase,
} from './use-cases';

@Injectable()
export class ChecklistService {
  constructor(
    private readonly createChecklistUseCase: CreateChecklistUseCase,
    private readonly findAllChecklistUseCase: FindAllChecklistUseCase,
    private readonly findChecklistByIdUseCase: FindChecklistByIdUseCase,
    private readonly updateChecklistUseCase: UpdateChecklistUseCase,
    private readonly deleteChecklistUseCase: DeleteChecklistUseCase,
  ) {}
  create(data: CreateChecklistDto) {
    return this.createChecklistUseCase.execute(data);
  }

  findAll() {
    return this.findAllChecklistUseCase.execute();
  }

  findOne(id: string) {
    return this.findChecklistByIdUseCase.execute(id);
  }

  update(id: string, data: UpdateChecklistDto) {
    return this.updateChecklistUseCase.execute(id, data);
  }

  remove(id: string) {
    return this.deleteChecklistUseCase.execute(id);
  }
}
