import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { PrismaService } from 'prismaService';

export class ServiceDiscoveryBaseQueryhandler {
  constructor(
    public querybus: QueryBus,
    public eventbus: EventBus,
    public commandbus: CommandBus,
    public prisma: PrismaService,
  ) {}
}
