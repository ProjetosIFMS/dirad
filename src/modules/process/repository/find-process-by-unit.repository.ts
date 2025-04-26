import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindProcessByUnitRepository {
  constructor(private readonly prisma: PrismaService) {}
  async listByUnitShortName(shortName: string) {
    return await this.prisma.process.findMany({
      where: {
        executingUnit: {
          shortName: shortName,
        },
      },
      include: {
        executingUnit: true,
      },
    });
  }
}
