import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindProcessByParticipatingUnitRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listByParticipatingUnitShortName(shortName: string) {
    return await this.prisma.process.findMany({
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
        //executingUnit: true,
        participatingUnits: true,
      },
    });
  }
}
