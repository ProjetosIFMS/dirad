import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() data: CreateActivityDto) {
    return this.activityService.create(data);
  }

  @Get()
  findAll(@Query('includeSteps') includeSteps: boolean) {
    return this.activityService.findAll(includeSteps);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('includeSteps') includeSteps: boolean,
  ) {
    return this.activityService.findOne(id, includeSteps);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
