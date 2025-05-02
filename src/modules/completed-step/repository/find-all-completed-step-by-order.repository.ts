import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllCompletedStepByOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCompletedStepByOrder() {
    return await this.prisma.completedStep.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }
}
