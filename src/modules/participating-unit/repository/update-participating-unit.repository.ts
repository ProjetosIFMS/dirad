import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateParticipatingUnitDto } from '../dto/update-participating-unit.dto';

@Injectable()
export class UpdateParticipatingUnitRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, data: UpdateParticipatingUnitDto) {
    const updatedParticipatingUnit = await this.prisma.participatingUnit.update(
      {
        where: { id },
        data,
      },
    );
    return updatedParticipatingUnit;
  }
}
