import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateActivityDto } from '../dto/create-activity.dto';

@Injectable()
export class CreateActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateActivityDto) {
    const activity = await this.prisma.activity.create({
      data,
    });
    return activity;
  }
}
