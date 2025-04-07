import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateUnitDto } from '../dto/update-unit.dto';

@Injectable()
export class UpdateUnitRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, data: UpdateUnitDto) {
    const unit = await this.prisma.unit.update({
      where: { id },
      data,
    });
    return unit;
  }
}
