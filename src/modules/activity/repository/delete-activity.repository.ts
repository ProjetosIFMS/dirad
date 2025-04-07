import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string) {
    const activity = await this.prisma.activity.delete({
      where: { id },
    });

    return activity;
  }
}
