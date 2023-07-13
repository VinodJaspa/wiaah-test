import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class ServiceSeederService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  services: Prisma.ServiceCreateInput[] = [];

  async onModuleInit() {
    await this.prisma.service.deleteMany();
    // await this.prisma.service.createMany({
    //   data: this.services,
    // });
  }
}
