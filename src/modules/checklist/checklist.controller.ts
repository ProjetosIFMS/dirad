import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';

@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Post()
  create(@Body() createChecklistDto: CreateChecklistDto) {
    return this.checklistService.create(createChecklistDto);
  }

  @Get()
  findAll() {
    return this.checklistService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('includeStep', new ParseBoolPipe({ optional: true }))
    includeStep: boolean,
  ) {
    return this.checklistService.findOne(id, includeStep ?? false);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateChecklistDto) {
    return this.checklistService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checklistService.remove(id);
  }
}
