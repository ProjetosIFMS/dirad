import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StepService } from './step.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post()
  create(@Body() data: CreateStepDto) {
    return this.stepService.create(data);
  }

  @Get()
  findAll() {
    return this.stepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stepService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateStepDto) {
    return this.stepService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepService.remove(id);
  }
}
