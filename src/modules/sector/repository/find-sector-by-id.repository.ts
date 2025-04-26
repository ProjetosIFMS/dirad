import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindSectorByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.sector.findUnique({
      where: { id },
      include: {
        originSteps: true,
        destinySteps: true,
      },
    });
  }
}
