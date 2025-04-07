import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateActivityDto } from '../dto/update-activity.dto';

@Injectable()
export class UpdateActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, data: UpdateActivityDto) {
    const activity = await this.prisma.activity.update({
      where: { id },
      data,
    });
    return activity;
  }
}
