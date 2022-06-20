import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { ProdutctsService } from './produtcts.service';
import { Product } from './entities/product.entity';
import { CreateProdutctInput } from './dto/create-produtct.input';
import { UpdateProdutctInput } from './dto/update-produtct.input';

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
  deleteAll() {
    return this.produtctsService.deleteAll();
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }) {
    return this.produtctsService.getProductById(ref.id);
  }
}
