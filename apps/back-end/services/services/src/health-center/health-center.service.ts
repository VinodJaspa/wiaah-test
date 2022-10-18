import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { CreateHealthCenterInput } from './dto/create-health-center.input';
import { HealthCenter } from './entities/health-center.entity';
import { HealthCenterService as PrismaHealthCenterService } from 'prismaClient';
import {
  ErrorHandlingService,
  getTranslatedResource,
  LANG_ID,
  UserPreferedLang,
} from 'nest-utils';
import { ServiceOwnershipService } from '@service-ownership';
import { ErrorHandlingTypedService, ErrorMessages } from '@utils';

@Injectable()
export class HealthCenterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly serviceOwnership: ServiceOwnershipService,
    @Inject(ErrorHandlingService)
    private readonly errorService: ErrorHandlingTypedService,
    @Inject(LANG_ID) private readonly langId: UserPreferedLang,
  ) {}

  async createHealthCenterService(
    input: CreateHealthCenterInput,
    userId: string,
  ): Promise<HealthCenter> {
    await this.checkCreatePremission(userId);
    const healthcenter = await this.prisma.healthCenterService.create({
      data: {
        ...input,
        ownerId: userId,
      },
    });

    return this.formatHealthCenterService(healthcenter, this.langId);
  }

  async checkCreatePremission(userId: string) {
    const hasService =
      !!(await this.serviceOwnership.getServiceOwnershipByUserId(userId));
    if (!hasService)
      throw new ForbiddenException(
        this.errorService.getError((v) => v.serviceDuplicationErr),
      );
  }

  formatHealthCenterService(
    input: PrismaHealthCenterService,
    langId: UserPreferedLang,
  ): HealthCenter {
    return {
      ...input,
      policies: getTranslatedResource({
        langId,
        resource: input.policies,
      }),
      serviceMetaInfo: getTranslatedResource({
        langId,
        resource: input.serviceMetaInfo,
      }),
    };
  }
}
