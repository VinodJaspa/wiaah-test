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
import { Inject, Logger, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { UpdateProdutctInput } from './dto/update-produtct.input';
import { ShippingDetails } from './entities/shippingDetails.entity';
import { TransformReadStream, UploadService } from '@wiaah/upload';
import { GraphQLUpload, Upload } from 'graphql-upload';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly shopClient: ClientKafka,
    private readonly uploadService: UploadService,
  ) {}

  logger = new Logger('ProductResolver');

  @Query(() => Product)
  async getProductById(@Args('id') id: string): Promise<Product> {
    const product = await this.productsService.getProductById(id);
    return { ...product };
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

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }) {
    return this.productsService.getProductById(ref.id);
  }

  @Mutation(() => Boolean)
  async uploadProductPresentations(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files: Upload[],
  ) {
    const promises = await Promise.all(files.map((v) => v.promise));
    try {
      this.uploadService.uploadImages(
        TransformReadStream(promises.map((v) => v.createReadStream())),
      );
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
