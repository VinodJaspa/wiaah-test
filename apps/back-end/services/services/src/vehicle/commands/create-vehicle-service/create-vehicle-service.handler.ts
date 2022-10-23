import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateVehicleServiceCommand, VehicleService } from '@vehicle-service';
import { PrismaService } from 'prismaService';

@CommandHandler(CreateVehicleServiceCommand)
export class CreateVehicleServiceHandler
  implements ICommandHandler<CreateVehicleServiceCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  execute({
    createVehicleServiceInput,
    selectedFields,
    user,
  }: CreateVehicleServiceCommand): Promise<VehicleService> {
    console.log({ createVehicleServiceInput, selectedFields, user });
    return {} as any;
  }
}
