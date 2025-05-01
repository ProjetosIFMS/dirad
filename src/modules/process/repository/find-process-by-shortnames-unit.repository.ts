import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindProcessByShortNamesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listByUnitShortNames(
    unitShortName: string,
    participatingUnitShortName: string,
    page: number,
    perPage: number,
  ) {
    const skip = (page - 1) * perPage;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.process.findMany({
        where: {
          executingUnit: {
            shortName: unitShortName,
          },
          participatingUnits: {
            some: {
              unit: {
                shortName: participatingUnitShortName,
              },
            },
          },
        },
        include: {
          executingUnit: true,
          participatingUnits: true,
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
            shortName: unitShortName,
          },
          participatingUnits: {
            some: {
              unit: {
                shortName: participatingUnitShortName,
              },
            },
          },
        },
      }),
    ]);
    return { data, total, page, perPage };
  }
}
