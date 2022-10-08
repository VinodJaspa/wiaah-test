import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import {
  GqlCurrentUser,
  GqlAuthorizationGuard,
  AuthorizationDecodedUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Category)
@UseGuards(new GqlAuthorizationGuard([]))
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category)
  getServiceCategoryById(
    @Args('categoryId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.getCategoryById(id, user.id);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  createServiceCategory(
    @Args('createServiceCategoryArgs') args: CreateCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.create(args, user.id);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  updateServiceCategory(
    @Args('updateServiceCategoryArgs') args: UpdateCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.update(args, user.id);
  }

  @Mutation(() => Category)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  removeServiceCategory(
    @Args('serviceCategoryId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.remove(id, user.id);
  }
}
