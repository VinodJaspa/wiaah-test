// import { UseGuards } from '@nestjs/common';
import { Args, Field, Mutation, Resolver } from '@nestjs/graphql';
// import {
//   AuthorizationDecodedUser,
//   GqlAuthorizationGuard,
//   GqlCurrentUser,
//   GqlSelectedFields,
//   GqlSelectedQueryFields,
// } from 'nest-utils';
// import { CreateBeautyCenterTreatmentCategoryInput } from './dto';
// import { DeleteTreatmentCategoriesInput } from './dto/delete-treatment-categories.input';
// import { DeleteTreatmentCategoryInput } from './dto/delete-treatment-category.input';
import { BeautyCenterTreatmentCategory } from './entities/beauty-center-treatment-category.entity';
import { TreatmentCategoryService } from './treatment-category.service';

// type GqlTreatmentCategoryFields =
//   GqlSelectedFields<BeautyCenterTreatmentCategory>;

@Resolver(() => BeautyCenterTreatmentCategory)
// @UseGuards(new GqlAuthorizationGuard(['admin']))
export class TreatmentCategoryResolver {
  constructor(
    private readonly TreatmentCategoryService: TreatmentCategoryService,
  ) {}

  // @Mutation(() => BeautyCenterTreatmentCategory)
  // createBeautyCenterTreatmentCategory(
  //   @Args('createBeautyCenterTreatmentCategory')
  //   input: CreateBeautyCenterTreatmentCategoryInput,
  //   @GqlCurrentUser() user: AuthorizationDecodedUser,
  //   @GqlSelectedQueryFields() fields: GqlTreatmentCategoryFields,
  // ): Promise<BeautyCenterTreatmentCategory> {
  //   return this.TreatmentCategoryService.createTreatmentCategory(
  //     input,
  //     user.id,
  //     fields,
  //   );
  // }

  // @Mutation(() => Boolean)
  // deleteBeautyCenter(
  //   @Args('deleteBeautyCenter') args: DeleteTreatmentCategoryInput,
  //   @GqlCurrentUser() user: AuthorizationDecodedUser,
  //   @GqlSelectedQueryFields() fields: GqlTreatmentCategoryFields,
  // ): Promise<BeautyCenterTreatmentCategory> {
  //   return this.TreatmentCategoryService.deleteTreatmentCategory(
  //     args,
  //     user.id,
  //     fields,
  //   );
  // }

  // @Mutation(() => Boolean)
  // deleteBeautyCenterServices(
  //   @Args('deleteBeautyCenterServices') args: DeleteTreatmentCategoriesInput,
  //   @GqlCurrentUser() user: AuthorizationDecodedUser,
  //   @GqlSelectedQueryFields() fields: GqlTreatmentCategoryFields,
  // ) {
  //   return this.TreatmentCategoryService.deleteTreatmentCategories(
  //     args,
  //     user.id,
  //   );
  // }
}
