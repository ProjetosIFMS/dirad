import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindAllByOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByOrder() {
    return await this.prisma.activity.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        step: true,
      },
    });
  }
}
