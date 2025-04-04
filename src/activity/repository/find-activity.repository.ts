import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async FindActivityById(id: string) {
    return await this.prisma.activity.findUnique({
      where: { id },
    });
  }
}
