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

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly produtctsService: ProductsService) {}

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
  resolveReference(ref: { __typename: string; title: string; id: string }) {
    console.log('resolving referance', ref);
    return [];
  }
}
