import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteModalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string) {
    const modality = await this.prisma.modality.delete({
      where: { id },
    });
    return modality;
  }
}
