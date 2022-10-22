import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ErrorHandlingTypedService } from '@utils';
import {
  DBErrorException,
  ErrorHandlingService,
  getTranslatedResource,
  GqlSelectedFields,
  LANG_ID,
  UserPreferedLang,
} from 'nest-utils';
import {
  Prisma,
  BeautyCenterTreatmentCategory as PrismaBeautyCenterTreatmentCategory,
} from 'prismaClient';
import { PrismaService } from 'prismaService';
import { CreateBeautyCenterTreatmentCategoryInput } from './dto';
import { DeleteTreatmentCategoriesInput } from './dto/delete-treatment-categories.input';
import { DeleteTreatmentCategoryInput } from './dto/delete-treatment-category.input';
import { UpdateTreatmentCategoriesInput } from './dto/update-treatment-categories.input';
import { BeautyCenterTreatmentCategory } from './entities';

type GqlBeautyCenterTreatmentCategorySelectedFields =
  GqlSelectedFields<BeautyCenterTreatmentCategory>;

@Injectable()
export class TreatmentCategoryService {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(forwardRef(() => LANG_ID))
    private readonly langId: UserPreferedLang,
    @Inject(ErrorHandlingService)
    private readonly errorService: ErrorHandlingTypedService,
  ) {}

  logger = new Logger('TreatmentCategoryService');

  async createTreatmentCategory(
    input: CreateBeautyCenterTreatmentCategoryInput,
    userId: string,
    selectedFields: GqlBeautyCenterTreatmentCategorySelectedFields,
  ): Promise<BeautyCenterTreatmentCategory> {
    try {
      const cate = await this.prisma.beautyCenterTreatmentCategory.create({
        data: { ...input, createdById: userId },
        select: this.getBeautyCenterTreatmentCategorySelection(selectedFields),
      });

      return this.formatBeautyCenterTreatmentCategory(cate);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getTreatmentCategories(
    ids?: string[],
  ): Promise<BeautyCenterTreatmentCategory[]> {
    const filters: Prisma.BeautyCenterTreatmentCategoryWhereInput[] = [
      { status: 'active' },
    ];

    if (Array.isArray(ids)) {
      filters.push({
        id: {
          in: ids,
        },
      });
    }

    const categories = await this.prisma.beautyCenterTreatmentCategory.findMany(
      {
        where: {
          AND: filters,
        },
      },
    );

    return categories.map((v) => this.formatBeautyCenterTreatmentCategory(v));
  }

  async deleteTreatmentCategory(
    input: DeleteTreatmentCategoryInput,
    userId: string,
    selectedFields?: GqlBeautyCenterTreatmentCategorySelectedFields,
  ): Promise<BeautyCenterTreatmentCategory> {
    try {
      const res = await this.prisma.beautyCenterTreatmentCategory.delete({
        where: {
          id: input.id,
        },
        select: this.getBeautyCenterTreatmentCategorySelection(selectedFields),
      });

      return this.formatBeautyCenterTreatmentCategory(res);
    } catch (error) {
      this.logger.error(error);
      throw new DBErrorException(this.errorService.getError((v) => v.DBError));
    }
  }

  async deleteTreatmentCategories(
    input: DeleteTreatmentCategoriesInput,
    userId: string,
  ): Promise<boolean> {
    try {
      await this.prisma.beautyCenterTreatmentCategory.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new DBErrorException(
        this.errorService.getError((v) => v.DBError, error),
      );
    }
  }

  async updateTreatmentCategories(
    input: UpdateTreatmentCategoriesInput,
    userId: string,
  ): Promise<boolean> {
    try {
      const { ids, ...rest } = input;
      await this.prisma.beautyCenterTreatmentCategory.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: rest,
      });

      return true;
    } catch (error) {
      this.logger.error(error);
      throw new DBErrorException(
        this.errorService.getError((v) => v.DBError, error),
      );
    }
  }

  private getBeautyCenterTreatmentCategorySelection(
    selectedFields: GqlBeautyCenterTreatmentCategorySelectedFields,
  ): Prisma.BeautyCenterTreatmentCategorySelect {
    return selectedFields ? selectedFields : undefined;
  }
  private formatBeautyCenterTreatmentCategory(
    input: Partial<PrismaBeautyCenterTreatmentCategory>,
  ): BeautyCenterTreatmentCategory {
    return {
      ...input,
      title: getTranslatedResource({
        langId: this.getLang(),
        resource: input.title,
      }),
    } as BeautyCenterTreatmentCategory;
  }

  private getLang() {
    return this.langId;
  }
}
