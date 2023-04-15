import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';

@Injectable()
export class WorkingScheduleRepository {
  constructor(private readonly prisma: PrismaService) {}

  createDefault(id: string) {
    return this.prisma.serviceWorkingSchedule.create({
      data: {
        id,
        sellerId: id,
        weekdays: {
          set: {
            fr: null,
            mo: null,
            sa: null,
            su: null,
            th: null,
            tu: null,
            we: null,
          },
        },
      },
    });
  }

  update(id: string, input: Prisma.ServiceWorkingScheduleUpdateInput) {
    return this.prisma.serviceWorkingSchedule.update({
      where: {
        id,
      },
      data: input,
    });
  }

  getOne(id: string) {
    return this.prisma.serviceWorkingSchedule.findUnique({
      where: {
        id,
      },
    });
  }
}
