import { Injectable } from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { CreateProcessUseCase } from './use-cases/create-process.use-case';
import { UpdateProcessUseCase } from './use-cases/update-process.use-case';
import { DeleteProcessUseCase } from './use-cases/delete-process.use-case';
import { FindProcessByIdUseCase } from './use-cases/find-process-by-id.use-case';
import { FindAllProcessesUseCase } from './use-cases/find-all-processes.use-case';

@Injectable()
export class ProcessService {
  constructor(
    private readonly createProcessUseCase: CreateProcessUseCase,
    private readonly updateProcessUseCase: UpdateProcessUseCase,
    private readonly deleteProcessUseCase: DeleteProcessUseCase,
    private readonly findProcessByIdUseCase: FindProcessByIdUseCase,
    private readonly findAllProcessesUseCase: FindAllProcessesUseCase,
  ) {}

  create(createProcessDto: CreateProcessDto) {
    return this.createProcessUseCase.execute(createProcessDto);
  }

  findAll() {
    return this.findAllProcessesUseCase.execute();
  }

  findOne(process_id: string) {
    return this.findProcessByIdUseCase.execute(process_id);
  }

  update(process_id: string, updateProcessDto: UpdateProcessDto) {
    return this.updateProcessUseCase.execute(process_id, updateProcessDto);
  }

  remove(process_id: string) {
    return this.deleteProcessUseCase.execute(process_id);
  }
}
