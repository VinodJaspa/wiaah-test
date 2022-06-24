import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProdutctInput } from './dto/create-produtct.input';
import { Shop } from './entities/shop.entity';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { UpdateProdutctInput } from './dto/update-produtct.input';

@Resolver(() => Product)
export class ProductsResolver implements OnModuleInit {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(SERVICES.SHOP_SERVICE.token)
    private readonly shopClient: ClientKafka,
  ) {}

  @Query(() => Product)
  getProductById(@Args('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Query(() => [Product])
  getProducts() {
    return this.productsService.getAll();
  }

  @Mutation(() => Product)
  @UseGuards(GqlAuthorizationGuard)
  createNewProduct(
    @Args('createNewProductInput') createProductInput: CreateProdutctInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.productsService.createNewProduct(createProductInput, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthorizationGuard)
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

  @ResolveField((of) => Shop)
  shop(@Parent() product: Product) {
    return {
      __typename: 'Shop',
      id: product.storeId,
    };
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }) {
    return this.productsService.getProductById(ref.id);
  }

  async onModuleInit() {
    this.shopClient.subscribeToResponseOf(KAFKA_MESSAGES.isOwnerOfShop);
    this.shopClient.subscribeToResponseOf(KAFKA_MESSAGES.getUserShopId);
    await this.shopClient.connect();
  }
}
