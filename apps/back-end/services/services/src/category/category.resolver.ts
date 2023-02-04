import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { ServiceCategory } from './entities/category.entity';
import { CreateServiceCategoryInput } from './dto/create-category.input';
import { UpdateServiceCategoryInput } from './dto/update-category.input';
import {
  GqlCurrentUser,
  GqlAuthorizationGuard,
  AuthorizationDecodedUser,
  accountType,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { GetFilteredCategoriesInput } from './dto/get-filtered-categories.input';
import { PrismaService } from 'prismaService';

@Resolver(() => ServiceCategory)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => ServiceCategory)
  getServiceCategoryById(
    @Args('categoryId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.getCategoryById(id, user.id);
  }

  @Query(() => ServiceCategory)
  async getServiceCategoryBySlug(
    @Args('slug') slug: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const res = await this.prisma.serviceCategory.findUnique({
      where: {
        slug,
      },
    });

    return res;
  }

  @Query(() => [ServiceCategory])
  getServiceCategories() {
    return this.categoryService.getAllCategories();
  }

  @Query(() => [ServiceCategory])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getFilteredServiceCategories(
    @Args('args', { nullable: true }) args: GetFilteredCategoriesInput,
  ) {
    return this.categoryService.getAllFilteredCategories(args);
  }

  @Mutation(() => ServiceCategory)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  createServiceCategory(
    @Args('createServiceCategoryArgs') args: CreateServiceCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.create(args, user.id);
  }

  @Mutation(() => ServiceCategory)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  updateServiceCategory(
    @Args('updateServiceCategoryArgs') args: UpdateServiceCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.update(args, user.id);
  }

  @Mutation(() => ServiceCategory)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  removeServiceCategory(
    @Args('serviceCategoryId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.remove(id, user.id);
  }
}
