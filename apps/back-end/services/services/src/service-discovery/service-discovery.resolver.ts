import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServiceDiscoveryService } from './service-discovery.service';
import { ServiceDiscovery } from './entities/service-discovery.entity';
import { CreateServiceDiscoveryInput } from './dto/create-service-discovery.input';
import { UpdateServiceDiscoveryInput } from './dto/update-service-discovery.input';

@Resolver(() => ServiceDiscovery)
export class ServiceDiscoveryResolver {
  constructor(private readonly serviceDiscoveryService: ServiceDiscoveryService) {}

  @Mutation(() => ServiceDiscovery)
  createServiceDiscovery(@Args('createServiceDiscoveryInput') createServiceDiscoveryInput: CreateServiceDiscoveryInput) {
    return this.serviceDiscoveryService.create(createServiceDiscoveryInput);
  }

  @Query(() => [ServiceDiscovery], { name: 'serviceDiscovery' })
  findAll() {
    return this.serviceDiscoveryService.findAll();
  }

  @Query(() => ServiceDiscovery, { name: 'serviceDiscovery' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.serviceDiscoveryService.findOne(id);
  }

  @Mutation(() => ServiceDiscovery)
  updateServiceDiscovery(@Args('updateServiceDiscoveryInput') updateServiceDiscoveryInput: UpdateServiceDiscoveryInput) {
    return this.serviceDiscoveryService.update(updateServiceDiscoveryInput.id, updateServiceDiscoveryInput);
  }

  @Mutation(() => ServiceDiscovery)
  removeServiceDiscovery(@Args('id', { type: () => Int }) id: number) {
    return this.serviceDiscoveryService.remove(id);
  }
}
