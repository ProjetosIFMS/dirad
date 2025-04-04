import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
@Injectable()
export class DeleteUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
