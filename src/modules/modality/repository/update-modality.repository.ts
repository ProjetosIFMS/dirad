import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateModalityInput } from '../inputs/update-modality.input';

@Injectable()
export class UpdateModalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, data: UpdateModalityInput) {
    const modality = await this.prisma.modality.update({
      where: { id },
      data,
    });
    return modality;
  }
}
