import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { DeleteHashtagInput } from '../dto';
import { CreateHashtagInput } from '../dto/create-hashtag.input';
import { Hashtag } from '../entities';

@Injectable()
export class HashtagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createHashtag(input: CreateHashtagInput): Promise<Hashtag> {
    return this.prisma.hashtag.create({
      data: input,
    });
  }

  async getAll(): Promise<Hashtag[]> {
    return this.prisma.hashtag.findMany();
  }

  async getHashtagById(id: string): Promise<Hashtag> {
    return this.prisma.hashtag.findUnique({
      where: {
        id,
      },
    });
  }

  async getHashtagByName(name: string): Promise<Hashtag> {
    return this.prisma.hashtag.findUnique({
      where: {
        name,
      },
    });
  }

  async deleteHashtag(input: DeleteHashtagInput): Promise<Hashtag> {
    return this.prisma.hashtag.delete({
      where: {
        id: input.id,
      },
    });
  }

  async incrementHashtagUsage(id: string): Promise<Hashtag> {
    return this.prisma.hashtag.update({
      where: {
        id,
      },
      data: {
        usage: {
          increment: 1,
        },
      },
    });
  }

  async decrementHashtagUsage(id: string): Promise<Hashtag> {
    return this.prisma.hashtag.update({
      where: {
        id,
      },
      data: {
        usage: {
          decrement: 1,
        },
      },
    });
  }
}
