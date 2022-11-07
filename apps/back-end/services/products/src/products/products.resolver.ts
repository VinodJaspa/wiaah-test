import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  ID,
} from '@nestjs/graphql';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_BROKERS,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { GraphQLUpload, Upload } from 'graphql-upload';
import { PrepareGqlUploads, UploadService } from '@wiaah/upload';

import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProdutctInput } from './dto/create-produtct.input';
import { UpdateProdutctInput } from './dto/update-produtct.input';
import { KafkaPubSub } from 'graphql-kafkajs-subscriptions';
import { Kafka } from 'kafkajs';

export const pubsub = KafkaPubSub.create({
  topic: 'subscriptions-topic',
  kafka: new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: 'subscriptions',
  }),
  groupIdPrefix: 'sub-service-group',
});

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly shopClient: ClientKafka,
    private readonly uploadService: UploadService,
  ) {}

  logger = new Logger('ProductResolver');

  @Mutation(() => Boolean)
  async test() {
    await (
      await pubsub
    ).publish(
      'subscriptions',
      JSON.stringify({ id: '6363313d1737d02ecdcab5e5' }),
    );
    console.log('tested 2');
    return true;
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: string): Promise<Product> {
    const product = await this.productsService.getProductById(id);
    return { ...product };
  }

  @Query(() => [Product])
  getProducts() {
    return this.productsService.getAll();
  }

  @Query(() => Product)
  product(@Args('id', { type: () => ID }) id: string) {
    console.log('getting prod', id);
    return this.productsService.getProductById(id);
  }

  @Mutation(() => Product)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  createNewProduct(
    @Args('createNewProductInput') createProductInput: CreateProdutctInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.productsService.createNewProduct(createProductInput, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  updateProduct(
    @Args('updateProductArgs') input: UpdateProdutctInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    return this.productsService.updateProduct(user.id, input);
  }

  @Mutation(() => Boolean)
  deleteAllProducts() {
    return this.productsService.deleteAll();
  }

  @Mutation(() => Boolean)
  createProductsPh() {
    return this.productsService.createPh();
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }) {
    return this.productsService.getProductById(ref.id);
  }

  @Mutation(() => Boolean)
  async uploadProductPresentations(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files: Upload[],
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      await this.uploadService.uploadFiles(PrepareGqlUploads(files), user.id);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
