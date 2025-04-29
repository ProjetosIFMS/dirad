import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllStepByOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllStepByOrder() {
    return await this.prisma.step.findMany({
      orderBy: {
        order: 'asc',
      },
      include: {
        activity: true,
        modality: true,
        originSector: true,
        destinySector: true,
      },
    });
  }
}
