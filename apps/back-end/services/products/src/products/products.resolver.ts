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
import { ShippingDetails } from './entities/shippingDetails.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly shopClient: ClientKafka,
  ) {}

  @Query(() => Product)
  async getProductById(@Args('id') id: string): Promise<Product> {
    const product = await this.productsService.getProductById(id);
    return { ...product, country: 'usa', attributes: [] };
  }

  @Query(() => [Product])
  getProducts() {
    return this.productsService.getAll();
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

  @ResolveField((of) => ShippingDetails, { nullable: true })
  shippingDetails(@Parent() product: Product) {
    if (!product.country) return null;
    return {
      __typename: 'ShippingDetails',
      country: product.country,
      shippingRulesIds: product.shippingRulesIds,
    };
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }) {
    return this.productsService.getProductById(ref.id);
  }
}
