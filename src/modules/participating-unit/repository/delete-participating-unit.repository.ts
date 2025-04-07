import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteParticipatingUnitRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string) {
    const deletedParticipatingUnit = await this.prisma.participatingUnit.delete(
      {
        where: { id },
      },
    );
    return deletedParticipatingUnit;
  }
}
