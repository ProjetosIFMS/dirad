import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindModalityByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findModalityById(id: string) {
    return await this.prisma.modality.findUnique({
      where: { id },
    });
  }
}
