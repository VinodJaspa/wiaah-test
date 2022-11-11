import { Injectable } from '@nestjs/common';
import { Membership } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { CreateMembershipInput, UpdateMembershipInput } from '../dto';

@Injectable()
export class MembershipRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.membership.findUnique({
      where: {
        id,
      },
    });
  }

  async create(
    input: CreateMembershipInput,
    userId: string,
  ): Promise<Membership> {
    return this.prisma.membership.create({
      data: input,
    });
  }

  async update({ id, ...res }: UpdateMembershipInput, userId: String) {
    return this.prisma.membership.update({
      where: {
        id,
      },
      data: res,
    });
  }

  async findAll(): Promise<Membership[]> {
    return this.prisma.membership.findMany();
  }

  async findAllActive(): Promise<Membership[]> {
    return this.prisma.membership.findMany({
      where: {
        active: true,
      },
    });
  }

  async activeateMembership(id: string): Promise<Membership> {
    return this.prisma.membership.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });
  }
}
