import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindParticipatingUnitByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const participatingUnit = await this.prisma.participatingUnit.findUnique({
      where: { id },
    });
    return participatingUnit;
  }
}
