import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteUnitRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUnit(id: string) {
    const unit = await this.prisma.unit.delete({
      where: { id },
    });

    return unit;
  }
}
