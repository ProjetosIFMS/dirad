import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { Status } from '../types/Status';

@Injectable()
export class FindProcessByStatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listProcessByStatus(
    status: Status,
    unitShortName: string,
    page: number,
    perPage: number,
  ) {
    const skip = (page - 1) * perPage;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.process.findMany({
        where: {
          situation: status,
          executingUnit: {
            shortName: unitShortName,
          },
        },
        include: {
          processType: true,
          executingUnit: true,
          modality: true,
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
          situation: status,
          executingUnit: {
            shortName: unitShortName,
          },
        },
      }),
    ]);
    return { data, total, page, perPage };
  }
}
