import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
  ResolveField,
  Parent,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { ProdutctsService } from './produtcts.service';
import { Product } from './entities/product.entity';
import { CreateProdutctInput } from './dto/create-produtct.input';
import { UpdateProdutctInput } from './dto/update-produtct.input';
import { Shop } from './entities/shop.entity';
import { Body, ExecutionContext } from '@nestjs/common';
import { Search } from './entities/search.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly produtctsService: ProdutctsService) {}

  @Query(() => Product, { name: 'getProductById' })
  getProductById(@Args('id') id: string) {
    return this.produtctsService.getProductById(id);
  }

  @Query(() => [Product])
  getProducts() {
    return this.produtctsService.getAll();
  }

  @Mutation(() => Product)
  createNewProduct(
    @Args('createNewProductInput') createProductInput: CreateProdutctInput,
  ) {
    return this.produtctsService.createNewProduct(createProductInput);
  }

  @Mutation(() => Boolean)
  deleteAllProducts() {
    return this.produtctsService.deleteAll();
  }

  @Mutation(() => Boolean)
  createProductsPh() {
    return this.produtctsService.createPh();
  }

  // @ResolveField(of => Search)
  // products(@Parent() product:Product){
  //   console.log("resolving search product",product)
  //   return
  // }

  @ResolveField((of) => Shop)
  shop(@Parent() product: Product) {
    console.log('resolving shop', product);
    return {
      __typename: 'Shop',
      id: 'product.storeId',
      test: 'test',
      name: 'name',
    };
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }) {
    console.log('resolving referance', ref);
    return this.produtctsService.getProductById(ref.id);
  }
}
