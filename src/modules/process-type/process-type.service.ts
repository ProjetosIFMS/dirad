import { Injectable } from '@nestjs/common';
import { CreateProcessTypeDto } from './dto/create-process-type.dto';
import { UpdateProcessTypeDto } from './dto/update-process-type.dto';
import {
  CreateProcessTypeUseCase,
  DeleteProcessTypeUseCase,
  FindAllProcessTypeUseCase,
  FindProcessTypeByIdUseCase,
  UpdateProcessTypeUseCase,
} from './use-cases';

@Injectable()
export class ProcessTypeService {
  constructor(
    private readonly createProcessTypeUseCase: CreateProcessTypeUseCase,
    private readonly findProcessTypeByIdUseCase: FindProcessTypeByIdUseCase,
    private readonly findAllProcessTypeUseCase: FindAllProcessTypeUseCase,
    private readonly updateProcessTypeUseCase: UpdateProcessTypeUseCase,
    private readonly deleteProcessTypeUseCase: DeleteProcessTypeUseCase,
  ) {}
  create(data: CreateProcessTypeDto) {
    return this.createProcessTypeUseCase.execute(data);
  }

  findAll() {
    return this.findAllProcessTypeUseCase.execute();
  }

  findOne(id: string) {
    return this.findProcessTypeByIdUseCase.execute(id);
  }

  update(id: string, data: UpdateProcessTypeDto) {
    return this.updateProcessTypeUseCase.execute(id, data);
  }

  remove(id: string) {
    return this.deleteProcessTypeUseCase.execute(id);
  }
}
