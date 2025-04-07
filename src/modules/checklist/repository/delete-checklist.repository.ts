import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class DeleteChecklistRepository {
  constructor(private readonly prisma: PrismaService) {}
  async delete(id: string) {
    const checklist = await this.prisma.checklist.delete({
      where: {
        id,
      },
    });
    return checklist;
  }
}
