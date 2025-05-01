import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { ProcessPaginationResult } from 'src/shared/interfaces/paginate';

@Injectable()
export class FindProcessByUnitRepository {
  constructor(private readonly prisma: PrismaService) {}
  async listByUnitShortName(
    shortName: string,
    page: number,
    perPage: number,
  ): Promise<ProcessPaginationResult> {
    const skip = (page - 1) * perPage;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.process.findMany({
        where: {
          executingUnit: {
            shortName: shortName,
          },
        },
        include: {
          executingUnit: true,
        },
        skip: Number(skip),
        take: Number(perPage),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.process.count({
        where: {
          executingUnit: {
            shortName: shortName,
          },
        },
      }),
    ]);
    return { data, total, page, perPage };
  }
}
