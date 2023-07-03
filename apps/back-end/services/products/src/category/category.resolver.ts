import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category, CategoryCursorResponse } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import {
  accountType,
  AuthorizationDecodedUser,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  UserPreferedLang,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { GetFilteredCategory } from './dto';
import { GetProductCategoriesCursorPaginationInput } from './dto/get-category.input';
import { PrismaService } from 'prismaService';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Category])
  getProductCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Query(() => CategoryCursorResponse)
  async getTopProductCategories(
    @Args('args') args: GetProductCategoriesCursorPaginationInput,
    @GetLang() langId: UserPreferedLang,
  ): Promise<CategoryCursorResponse> {
    const res = await this.prisma.productCategory.findMany({
      orderBy: {
        sales: 'desc',
      },
      where: {
        status: 'active',
      },
      cursor: args.cursor
        ? {
            id: args.cursor,
          }
        : undefined,
      take: args.take + 1,
    });

    const hasMore = res.length > args.take;

    return {
      hasMore,
      data: (hasMore ? res.slice(0, args.take) : res).map((c) =>
        this.categoryService.formatCategory(c, langId),
      ),
      cursor: args.cursor,
      nextCursor: res.at(args.take)?.id,
    };
  }

  @Query(() => [Category])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getFilteredProductCategories(
    @Args('args', { nullable: true }) args: GetFilteredCategory,
    @GetLang() lang: string,
  ) {
    return this.categoryService.getAllCategories(args, lang);
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  createProductCategory(
    @Args('createCategoryInput') args: CreateCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<boolean> {
    return this.categoryService.createCategory(args, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  deleteProductCategory(
    @Args('deleteCategoryId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.deleteCategory(id, user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  updateProductCategory(
    @Args('updateCategoryArgs') args: UpdateCategoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.categoryService.updateCategory(args, user.id);
  }
}
