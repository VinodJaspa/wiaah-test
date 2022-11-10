import { Injectable } from '@nestjs/common';
import { Newsletter } from 'prismaClient';
import { PrismaService } from 'prismService';

import { NewsletterInput } from '../dto';
import { UpdateNewsletterInput } from '../dto/update-newsletter.input';

@Injectable()
export class NewsletterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createNewsLetter(
    userId: string,
    input?: NewsletterInput,
  ): Promise<Newsletter> {
    const res = await this.prisma.newsletter.create({
      data: {
        ownerId: userId,
        emailSettings: input || {},
      },
    });
    return res;
  }

  async changeNewsLetterSettings(
    newsletterId: string,
    input: UpdateNewsletterInput,
  ): Promise<boolean> {
    try {
      await this.prisma.newsletter.update({
        where: {
          id: newsletterId,
        },
        data: {
          emailSettings: { update: input },
        },
      });
    } catch {
      return false;
    }
  }

  async getUserNewsLetter(userId: string) {
    return this.prisma.newsletter.findUnique({
      where: {
        ownerId: userId,
      },
    });
  }
}
