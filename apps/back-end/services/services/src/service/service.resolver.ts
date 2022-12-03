import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { ServiceType } from 'prismaClient';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @ResolveReference()
  reslove(ref: { id: string; type: ServiceType }) {
    return this.serviceService.getServiceByIdAndType(ref?.id, ref?.type);
  }
}
