import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompletedStepService } from './completed-step.service';
import { CreateCompletedStepDto } from './dto/create-completed-step.dto';
import { UpdateCompletedStepDto } from './dto/update-completed-step.dto';

@Controller('completed-step')
export class CompletedStepController {
  constructor(private readonly completedStepService: CompletedStepService) {}

  @Post()
  create(@Body() createCompletedStepDto: CreateCompletedStepDto) {
    return this.completedStepService.create(createCompletedStepDto);
  }

  @Get('order')
  findAllByOrder() {
    return this.completedStepService.findAllByOrder();
  }

  @Get()
  findAll() {
    return this.completedStepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completedStepService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompletedStepDto: UpdateCompletedStepDto,
  ) {
    return this.completedStepService.update(id, updateCompletedStepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completedStepService.remove(id);
  }
}
