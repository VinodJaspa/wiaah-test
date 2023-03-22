import { Controller } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Controller()
export class ProfileStatisticsController {
  constructor(private readonly prisma: PrismaService) {}
}
