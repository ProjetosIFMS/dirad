import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteProcessRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteProcess(id: string) {
    return await this.prisma.process.delete({
      where: { id },
    });
  }
}
