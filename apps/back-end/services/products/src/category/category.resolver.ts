import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { GetFilteredCategory } from './dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  getCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Query(() => [Category])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getFilteredCategory(
    @Args('args', { nullable: true }) args: GetFilteredCategory,
  ) {
    return this.categoryService.getAllCategories(args);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  createCategory(
    @Args('createCategoryInput') args: CreateCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Category> {
    return this.categoryService.createCategory(args, user.id);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  deleteCategory(
    @Args('deleteCategoryId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.deleteCategory(id, user.id);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  updateCategory(
    @Args('updateCategoryArgs') args: UpdateCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.updateCategory(args, user.id);
  }
}
