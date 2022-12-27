import { Resolver } from '@nestjs/graphql';
import { Event } from './entities/event.entity';
import { PrismaService } from 'prismaService';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly prisma: PrismaService) {}
}
