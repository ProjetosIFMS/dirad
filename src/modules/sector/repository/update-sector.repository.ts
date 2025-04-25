import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateSectorDto } from '../dto/update-sector.dto';

@Injectable()
export class UpdateSectorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, data: UpdateSectorDto) {
    return await this.prisma.sector.update({
      where: { id },
      data,
    });
  }
}
