import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindProcessByShortNamesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listByUnitShortNames(
    unitShortName: string,
    participatingUnitShortName: string,
  ) {
    return await this.prisma.process.findMany({
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
    });
  }
}
