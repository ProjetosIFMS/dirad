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

  async create(createProcessDto: CreateProcessDto) {
    return await this.createProcessUseCase.execute(createProcessDto);
  }

  async findAll(
    page: number,
    perPage: number,
    unitShortName?: string,
    participatingUnitShortName?: string,
    status?: string,
    modality?: string,
    processType?: string,
    object?: string,
    startDate?: string,
    expectedEndDate?: string,
  ) {
    return await this.findAllProcessesUseCase.execute(
      page,
      perPage,
      unitShortName,
      participatingUnitShortName,
      status,
      modality,
      processType,
      object,
      startDate,
      expectedEndDate,
    );
  }

  async findOne(process_id: string) {
    return await this.findProcessByIdUseCase.execute(process_id);
  }

  async update(process_id: string, updateProcessDto: UpdateProcessDto) {
    return await this.updateProcessUseCase.execute(
      process_id,
      updateProcessDto,
    );
  }

  async remove(process_id: string) {
    return await this.deleteProcessUseCase.execute(process_id);
  }
}
