import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindUnitByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async FindUnitById(id: string) {
    return await this.prisma.unit.findUnique({
      where: { id },
    });
  }
}
