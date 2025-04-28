import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductAttributeService } from './product-attribute.service';
import { PrismaService } from 'prismaService';
import { ProductAttribute, ProductRawAttribute } from '@products';
import {
  ExtractPagination,
  GetLang,
  GqlAuthorizationGuard,
  ResourceNotFoundPublicError,
  UserPreferedLang,
  accountType,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { CreateProductAttributeInput } from './dto/create-product-attribute.input';
import { UpdateProductAttributeInput } from './dto/update-product-attribute.input';
import { ObjectId } from 'mongodb';
import { GetAdminProductAttributesPaginationInput } from './dto/get-admin-product-attributes.input';
import { ProductAttributesPaginationResponse } from './entities';


@Resolver(() => ProductAttribute)
export class ProductAttributeResolver {
  constructor(
    private readonly productAttributeService: ProductAttributeService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => ProductRawAttribute)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async getRawAttribute(@Args('id') id: string): Promise<ProductRawAttribute> {
    const attributes = await this.prisma.productAttribute.findUnique({
      where: {
        id,
      },
    });

    return attributes;
  }

  @Query(() => ProductAttributesPaginationResponse)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async adminGetAttributes(
    @Args('args') args: GetAdminProductAttributesPaginationInput,
    @GetLang() langId: UserPreferedLang,
  ): Promise<ProductAttributesPaginationResponse> {
    const { page, skip, take, totalSearched } = ExtractPagination(
      args.pagination,
    );
    const attributes = await this.prisma.productAttribute.findMany({
      where: {
        name: {
          some: {
            value: {
              contains: args.name,
            },
          },
        },
      },
      skip,
      take: take + 1,
    });

    const total = await this.prisma.productAttribute.count({
      where: {
        name: {
          some: {
            value: {
              contains: args.name,
            },
          },
        },
      },
    });

    return {
      data: attributes
        .slice(0, take)
        .map((v) =>
          this.productAttributeService.formatProductAttribute(v, langId),
        ),
      hasMore: attributes.length > take,
      total,
    };
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async updateAttribute(@Args('args') args: UpdateProductAttributeInput) {
    const attribute = await this.prisma.productAttribute.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!attribute) throw new ResourceNotFoundPublicError();

    const unChangedValues = attribute?.values?.filter(
      // filter to get un changed values only
      (value) => !args?.values?.map((v) => v.id).includes(value.id),
    );

    const changedValues = attribute?.values
      // filter to get changed values only
      ?.filter((value) => args?.values?.map((v) => v.id).includes(value.id))
      // map to get update values
      .map((att) => {
        const newData = args.values.find((v) => v.id === att.id);
        if (newData) {
          return { ...att, ...newData };
        } else return null;
      })
      // filter null values
      .filter((v) => !!v);

    await this.prisma.productAttribute.update({
      data: { 
        ...args, 
        values: [...unChangedValues, ...changedValues] as any[], 
        name: args.name.map((n) => ({
          value: n.value,
        })) as any[], // Ensure proper mapping for the 'name' field
      },
      where: {
        id: args.id,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async createAttribute(@Args('args') args: CreateProductAttributeInput) {
    await this.prisma.productAttribute.create({
      data: {
        ...args,
        values: args.values.map((v) => ({
          id: new ObjectId().toHexString(),
          name: v.name,
          value: v.value,
        })) as any[],
        name: args.name.map((n) => ({
          value: n.value,
           
        })) as any[],
      },
    });

    return true;
  }

  @Query(() => ProductAttribute)
  @Query(() => [ProductAttribute])
  @UseGuards(new GqlAuthorizationGuard([]))
  async getProductAttributesByProductCategory(
    @Args('categoryId') id: string,
    @GetLang() langId: UserPreferedLang,
  ): Promise<ProductAttribute[]> {
    const category = await this.prisma.productCategory.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new ResourceNotFoundPublicError();

    const attIds = category.attributeIds;

    const attributes = await this.prisma.productAttribute.findMany({
      where: {
        id: {
          in: attIds,
        },
      },
    });

    return attributes.map((att) =>
      this.productAttributeService.formatProductAttribute(att, langId),
    );
  }
}
