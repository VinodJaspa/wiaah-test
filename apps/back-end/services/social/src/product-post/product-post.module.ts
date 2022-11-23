import { Module } from '@nestjs/common';
import { ProductPostResolver } from './product-post.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductPostRepository } from './repository';
import { productPostCommandHandlers } from './commands';
import { productPostEventHandlers } from './events';
import { productPostQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  providers: [
    ProductPostResolver,
    ProductPostRepository,
    ...productPostCommandHandlers,
    ...productPostQueryHandlers,
    ...productPostEventHandlers,
  ],
})
export class ProductPostModule {}
