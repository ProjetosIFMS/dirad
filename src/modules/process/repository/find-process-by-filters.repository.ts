import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { Status } from '../types/Status';

@Injectable()
export class FindProcessByFiltersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProcessByFilters(
    page: number,
    perPage: number,
    // processNumber?: string,
    unitShortName?: string,
    participatingUnitShortName?: string,
    status?: Status,
    modality?: string,
    processType?: string,
    object?: string,
    startDate?: Date,
    expectedEndDate?: Date,
  ) {
    const skip = (page - 1) * perPage;
    const where = {
      // ...(processNumber && { processNumber }),
      ...(unitShortName && { executingUnit: { shortName: unitShortName } }),
      ...(participatingUnitShortName && {
        participatingUnits: {
          some: { unit: { shortName: participatingUnitShortName } },
        },
      }),
      ...(status && { situation: status }),
      ...(modality && { modality: { name: modality } }),
      ...(processType && { processType: { name: processType } }),
      ...(object && { object }),
      ...(startDate && { startDate: { gte: startDate } }),
      ...(expectedEndDate && { expectedEndDate: { lte: expectedEndDate } }),
    };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.process.findMany({
        where,
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
        where,
      }),
    ]);
    return { data, total, page, perPage };
  }
}
