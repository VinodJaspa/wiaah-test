import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  getCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  createCategory(
    @Args('createCategoryInput') args: CreateCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Category> {
    return this.categoryService.createCategory(args, user.id);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  deleteCategory(
    @Args('deleteCategoryId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.deleteCategory(id, user.id);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  updateCategory(
    @Args('updateCategoryArgs') args: UpdateCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.updateCategory(args, user.id);
  }
}
