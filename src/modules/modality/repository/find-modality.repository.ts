import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindModalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllModality() {
    return await this.prisma.modality.findMany({
      include: {
        steps: true,
      },
    });
  }
}
