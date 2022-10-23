import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ServiceOwnershipService } from '@service-ownership';
import {
  DBErrorException,
  ErrorHandlingService,
  getTranslatedResource,
  GqlSelectedFields,
  TranslationService,
  UserPreferedLang,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { CreateBeautyCenterInput } from './dto/create-beauty-center.input';
import { BeautyCenter } from './entities/beauty-center.entity';
import {
  BeautyCenterService as PrismaBeautyCenterService,
  BeautyCenterTreatment,
  Prisma,
} from 'prismaClient';
import { v4 as uuid } from 'uuid';
import { ErrorHandlingTypedService } from '@utils';
import {
  UpdateBeautyCenterInput,
  UpdateBeautyCenterTreatmentInput,
} from './dto/update-beauty-center.input';
import { TreatmentCategoryService } from './treatment-category.service';

type GqlBeautyCenterSelectedFields = GqlSelectedFields<BeautyCenter>;

@Injectable()
export class BeautyCenterService {
  constructor(
    private readonly serviceOwnership: ServiceOwnershipService,
    private readonly treatmentCategoriesService: TreatmentCategoryService,
    private readonly prisma: PrismaService,
    private readonly translationService: TranslationService,
    @Inject(ErrorHandlingService)
    private readonly errorService: ErrorHandlingTypedService,
  ) {}

  logger = new Logger('BeautyCenterService');

  async createBeautyCenter(
    input: CreateBeautyCenterInput,
    userId: string,
    selectedFields?: GqlBeautyCenterSelectedFields,
  ): Promise<BeautyCenter> {
    await this.validateCreateInput(input);
    await this.checkCreatePremissions(userId);

    const center = await this.prisma.beautyCenterService.create({
      data: {
        ...input,
        ownerId: userId,
        treatments: input.treatments.map((v) => ({
          ...v,
          id: uuid(),
        })),
      },
      select: selectedFields
        ? this.getBeautyCenterSelection(selectedFields)
        : undefined,
    });

    return this.formatBeautyCenterServiceData(center);
  }

  async getBeautyCenterById(
    id: string,
    userId?: string,
    selectedFields?: GqlBeautyCenterSelectedFields,
  ): Promise<BeautyCenter> {
    const center = await this.prisma.beautyCenterService.findUnique({
      where: {
        id,
      },
      select: selectedFields
        ? this.getBeautyCenterSelection(selectedFields)
        : undefined,
    });

    return this.formatBeautyCenterServiceData(center);
  }

  async updateBeautyCenter(
    input: UpdateBeautyCenterInput,
    userId: string,
    selectedFields?: GqlBeautyCenterSelectedFields,
  ): Promise<BeautyCenter> {
    await this.validateUpdateInput(input);
    const service = await this.checkModifyPremissions(input.id, userId);
    try {
      const { treatments, id, ...rest } = input;

      const res = await this.prisma.beautyCenterService.update({
        where: {
          id: input.id,
        },
        data: {
          ...rest,
          treatments: this.updateBeautyCenterTreatments(
            treatments,
            service.treatments,
          ),
        },
        select: selectedFields
          ? this.getBeautyCenterSelection(selectedFields)
          : undefined,
      });

      return this.formatBeautyCenterServiceData(res);
    } catch (error) {
      this.logger.error(error);
      throw new DBErrorException(this.errorService.getError((v) => v.DBError));
    }
  }

  async deleteBeautyCenter(
    serviceId: string,
    userId: string,
    selectedFields?: GqlBeautyCenterSelectedFields,
  ): Promise<BeautyCenter> {
    await this.checkModifyPremissions(serviceId, userId);

    try {
      const service = await this.prisma.beautyCenterService.delete({
        where: {
          id: serviceId,
        },
        select: this.getBeautyCenterSelection(selectedFields),
      });

      return this.formatBeautyCenterServiceData(service);
    } catch (error) {
      this.logger.error(error);
      throw new DBErrorException(this.errorService.getError((v) => v.DBError));
    }
  }

  private updateBeautyCenterTreatments(
    input: UpdateBeautyCenterTreatmentInput[],
    oldTreatments: BeautyCenterTreatment[],
  ): BeautyCenterTreatment[] {
    const inputIds = input.map((v) => v.id);
    const unModifedTreatments = oldTreatments.filter(
      (v) => !inputIds.includes(v.id),
    );

    const modifiedTreatments = oldTreatments.reduce((acc, curr) => {
      if (inputIds.includes(curr.id)) {
        const newData = input.find((v) => v.id === curr.id);
        const oldData = oldTreatments.find((v) => v.id === curr.id);
        if (!newData || !oldData) return acc;
        return [...acc, { ...oldData, ...newData }];
      } else {
        return acc;
      }
    }, []);

    return [...unModifedTreatments, ...modifiedTreatments];
  }

  private async checkModifyPremissions(
    serviceId: string,
    userId: string,
    selectedFields?: GqlBeautyCenterSelectedFields,
  ): Promise<PrismaBeautyCenterService> {
    let notFoundErr = this.errorService.getError((v) => v.serviceIdNotFoundErr);
    const service = await this.prisma.beautyCenterService.findUnique({
      where: {
        id: serviceId,
      },
      rejectOnNotFound() {
        throw new NotFoundException(notFoundErr);
      },
    });
    if (service.ownerId !== userId)
      throw new ForbiddenException(
        this.errorService.getError((v) => v.forbiddenActionErr),
      );

    return service;
  }

  private async checkCreatePremissions(userId: string) {
    const hasService = await this.serviceOwnership.getServiceOwnershipByUserId(
      userId,
    );
    if (hasService)
      throw new ForbiddenException(
        this.errorService.getError((v) => v.serviceDuplicationErr),
      );
  }

  private async validateCreateInput(input: CreateBeautyCenterInput) {
    const treats = await this.treatmentCategoriesService.getTreatmentCategories(
      input.treatments.map((v) => v.treatmentCategoryId),
    );

    if (treats.length !== input.treatments.length)
      throw new BadRequestException(
        this.errorService.getError((v) => v.treatmentCategoryIdNotFoundErr),
      );

    return true;
  }

  private async validateUpdateInput(input: UpdateBeautyCenterInput) {
    const treats = await this.treatmentCategoriesService.getTreatmentCategories(
      input.treatments.map((v) => v.treatmentCategoryId),
    );

    if (treats.length !== input.treatments.length)
      throw new BadRequestException(
        this.errorService.getError((v) => v.treatmentCategoryIdNotFoundErr),
      );

    return true;
  }

  private getBeautyCenterSelection(
    selectedFields: GqlBeautyCenterSelectedFields,
  ): Prisma.BeautyCenterServiceSelect {
    return selectedFields
      ? {
          ...selectedFields,
          serviceMetaInfo: selectedFields.serviceMetaInfo
            ? {
                select: {
                  langId: true,
                  value: selectedFields.serviceMetaInfo,
                },
              }
            : false,
          policies: selectedFields.policies
            ? {
                select: {
                  langId: true,
                  value: selectedFields.policies,
                },
              }
            : false,
        }
      : undefined;
  }
  private getLang(): UserPreferedLang {
    return this.translationService.getLangIdFromLangHeader();
  }

  private formatBeautyCenterServiceData(
    input?: Partial<PrismaBeautyCenterService>,
  ): BeautyCenter {
    return {
      ...input,
      policies: getTranslatedResource({
        langId: this.getLang(),
        resource: input?.policies,
      }),
      serviceMetaInfo: getTranslatedResource({
        langId: this.getLang(),
        resource: input?.serviceMetaInfo,
      }),
      treatments: Array.isArray(input?.treatments)
        ? input?.treatments.map((v) => ({
            ...v,
            title: getTranslatedResource({
              langId: this.getLang(),
              resource: v.title,
            }),
          }))
        : [],
    } as BeautyCenter;
  }
}
