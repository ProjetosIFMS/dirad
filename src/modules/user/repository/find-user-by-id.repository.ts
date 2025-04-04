import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
@Injectable()
export class FindUserByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}
