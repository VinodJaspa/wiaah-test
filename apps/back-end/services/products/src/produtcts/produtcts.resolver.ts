import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProdutctsService } from './produtcts.service';
import { Produtct } from './entities/produtct.entity';
import { CreateProdutctInput } from './dto/create-produtct.input';
import { UpdateProdutctInput } from './dto/update-produtct.input';

@Resolver(() => Produtct)
export class ProdutctsResolver {
  constructor(private readonly produtctsService: ProdutctsService) {}

  @Query(() => Produtct, { name: 'getProductById' })
  getProductById(@Args('id') id: string) {
    return this.produtctsService.getProductById(id);
  }

  @Query(() => [Produtct])
  getProducts() {
    return this.produtctsService.getAll();
  }

  @Mutation(() => Produtct)
  createNewProduct(
    @Args('createNewProductInput') createProductInput: CreateProdutctInput,
  ) {
    return this.produtctsService.createNewProduct(createProductInput);
  }

  @Mutation(() => Boolean)
  deleteAll() {
    return this.produtctsService.deleteAll();
  }
}
