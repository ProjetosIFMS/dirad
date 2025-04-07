import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllParticipatingUnitsByProcessRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUnits(processId: string) {
    const units = await this.prisma.participatingUnit.findMany({
      where: {
        processId,
      },
      include: {
        unit: true,
      },
    });

    return units;
  }
}
