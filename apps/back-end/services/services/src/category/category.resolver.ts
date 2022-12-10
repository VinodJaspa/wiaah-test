import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import {
  GqlCurrentUser,
  GqlAuthorizationGuard,
  AuthorizationDecodedUser,
  accountType,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { GetFilteredCategoriesInput } from './dto/get-filtered-categories.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category)
  getServiceCategoryById(
    @Args('categoryId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.getCategoryById(id, user.id);
  }

  @Query(() => [Category])
  getServiceCategories(
    @Args('args', { nullable: true }) args: GetFilteredCategoriesInput,
  ) {
    return this.categoryService.getAllCategories(args);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  createServiceCategory(
    @Args('createServiceCategoryArgs') args: CreateCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.create(args, user.id);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  updateServiceCategory(
    @Args('updateServiceCategoryArgs') args: UpdateCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.update(args, user.id);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  removeServiceCategory(
    @Args('serviceCategoryId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.remove(id, user.id);
  }
}
