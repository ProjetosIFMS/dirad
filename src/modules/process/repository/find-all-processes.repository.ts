import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { ProcessPaginationResult } from '../../../shared/interfaces/paginate';

@Injectable()
export class FindAllProcessesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProcesses(
    page: number,
    perPage: number,
  ): Promise<ProcessPaginationResult> {
    const skip = (page - 1) * perPage;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.process.findMany({
        skip: Number(skip),
        take: Number(perPage),
        include: {
          processType: true,
          executingUnit: true,
          participatingUnits: {
            include: {
              unit: true,
            },
          },
          modality: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.process.count(),
    ]);

    return { data, total, page, perPage };
  }
}
