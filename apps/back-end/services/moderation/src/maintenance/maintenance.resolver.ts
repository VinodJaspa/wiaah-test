import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { CreateMaintenanceInput } from './dto';
import { Maintenance } from './entities';

@Resolver(() => Maintenance)
export class MaintenanceResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Maintenance])
  getMaintenancePages(): Promise<Maintenance[]> {
    return this.prisma.maintenancePage.findMany();
  }

  @Mutation(() => Boolean)
  async createMaintenancePage(@Args('args') args: CreateMaintenanceInput) {
    try {
      await this.prisma.maintenancePage.create({
        data: {
          url: args.url,
          from: new Date(args.from),
          to: new Date(args.to),
        },
      });

      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteMaintenancePage(@Args('id') id: string) {
    try {
      await this.prisma.maintenancePage.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log({ error });
      return false;
    }
  }

  @Query(() => Boolean)
  async isMaintenance(@Args('url') url: string) {
    try {
      const res = await this.prisma.maintenancePage.findMany({
        where: {
          url,
        },
      });

      return res ? true : false;
    } catch (error) {
      console.log({ error });
      return true;
    }
  }
}
