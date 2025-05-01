import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { ProcessPaginationResult } from 'src/shared/interfaces/paginate';

@Injectable()
export class FindProcessByParticipatingUnitRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listByParticipatingUnitShortName(
    shortName: string,
    page: number,
    perPage: number,
  ): Promise<ProcessPaginationResult> {
    const skip = (page - 1) * perPage;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.process.findMany({
        where: {
          participatingUnits: {
            some: {
              unit: {
                shortName: shortName,
              },
            },
          },
        },
        include: {
          processType: true,
          executingUnit: true,
          participatingUnits: {
            include: {
              unit: true,
            },
          },
        },
        skip: Number(skip),
        take: Number(perPage),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.process.count({
        where: {
          participatingUnits: {
            some: {
              unit: {
                shortName: shortName,
              },
            },
          },
        },
      }),
    ]);
    return { data, total, page, perPage };
  }
}
