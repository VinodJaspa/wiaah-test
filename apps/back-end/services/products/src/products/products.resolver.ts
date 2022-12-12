import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  ID,
} from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlPaginationInput,
} from 'nest-utils';
import { GraphQLUpload, Upload } from 'graphql-upload';
import { PrepareGqlUploads, UploadService } from '@wiaah/upload';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductsService } from '@products/products.service';
import { MyProduct, Product } from '@products/entities';
import { CreateProductInput } from '@products/dto';
import { UpdateProductInput } from '@products/dto';
import {
  GetProductVendorLinkQuery,
  GetSellerProductsQuery,
} from '@products/queries';

import { DeleteProductCommand } from '@products/command';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly uploadService: UploadService,
    private readonly querybus: QueryBus,
    private readonly commandbus: CommandBus,
  ) {}

  logger = new Logger('ProductResolver');

  @Mutation(() => String)
  getProductVendorLink(
    @Args('productId') productId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<GetProductVendorLinkQuery, string>(
      new GetProductVendorLinkQuery(productId, user),
    );
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
  getProduct(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.getProductById(id);
  }

  @Mutation(() => Product)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  createNewProduct(
    @Args('createNewProductInput') createProductInput: CreateProductInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.productsService.createNewProduct(createProductInput, user);
  }

  @Mutation(() => Product)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  updateProduct(
    @Args('updateProductArgs') input: UpdateProductInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Product> {
    return this.productsService.updateProduct(user.id, input);
  }

  // TODO:delete on production
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

  @Query(() => [MyProduct])
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  getMyProducts(
    @Args('args', { type: () => GqlPaginationInput })
    pagination: GqlPaginationInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<GetSellerProductsQuery>(
      new GetSellerProductsQuery(user.id, pagination),
    );
  }

  @Mutation(() => Product)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  deleteProduct(
    @Args('productId', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<DeleteProductCommand, Product>(
      new DeleteProductCommand(id, user.id),
    );
  }
}
