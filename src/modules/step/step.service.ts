import { Injectable } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

@Injectable()
export class StepService {
  create(createStepDto: CreateStepDto) {
    return createStepDto;
  }

  findAll() {
    return `This action returns all step`;
  }

  findOne(id: number) {
    return `This action returns a #${id} step`;
  }

  update(id: number, updateStepDto: UpdateStepDto) {
    return { updateStepDto, id };
  }

  remove(id: number) {
    return `This action removes a #${id} step`;
  }
}
