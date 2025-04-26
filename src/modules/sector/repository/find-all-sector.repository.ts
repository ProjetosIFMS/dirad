import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllSectorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.sector.findMany({
      include: {
        originSteps: true,
        destinySteps: true,
      },
    });
  }
}
