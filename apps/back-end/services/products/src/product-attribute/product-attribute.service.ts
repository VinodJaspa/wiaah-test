import { Injectable } from '@nestjs/common';
import { ProductAttribute } from '@products';
import { ProductAttribute as PrismaProductAttribute } from '@prisma-client';
import { UserPreferedLang, getTranslatedResource } from 'nest-utils';

@Injectable()
export class ProductAttributeService {
  formatProductAttribute(
    attribute: PrismaProductAttribute,
    langId: UserPreferedLang,
  ): ProductAttribute {
    return {
      ...attribute,
      name: getTranslatedResource({
        langId,
        resource: attribute.name,
      }),
      values: attribute.values.map((v) => ({
        ...v,
        name: getTranslatedResource({
          langId,
          resource: v.name,
        }),
      })),
    };
  }
}
