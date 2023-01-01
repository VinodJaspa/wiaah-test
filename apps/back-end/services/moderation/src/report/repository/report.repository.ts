import { Injectable } from '@nestjs/common';
import { CreateReportInput } from '@report/dto';
import { ReportContentType } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class ReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateReportInput, userId: string) {
    return this.prisma.report.create({
      data: {
        ...input,
      },
    });
  }

  getAllByType(type: ReportContentType) {
    return this.prisma.report.findMany({
      where: {
        contentType: type,
      },
    });
  }
}
