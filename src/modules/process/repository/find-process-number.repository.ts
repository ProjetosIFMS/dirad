import { PrismaService } from 'src/shared/databases/prisma.database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindProcessNumberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProcessNumber(processNumber: string) {
    return await this.prisma.process.findFirst({
      where: {
        processNumber,
      },
    });
  }
}
