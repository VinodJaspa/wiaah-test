import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class ShopRepository {
  constructor(private readonly prisma: PrismaService) {}
}
