import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prismaService';
import {
  HealthCenterDoctor as PrismaHealthCenterDoctor,
  HealthCenterService as PrismaHealthCenterService,
  HealthCenterSpecialty as PrismaHealthCenterSpeciality,
} from 'prismaClient';
import {
  DBErrorException,
  ErrorHandlingService,
  getTranslatedResource,
  TranslationService,
  UserPreferedLang,
} from 'nest-utils';
import { ServiceOwnershipService } from '@service-ownership';
import { ErrorHandlingTypedService } from '@utils';
import {
  UpdateHealthCenterInput,
  HealthCenterSpecialty,
  HealthCenterDoctor,
  CreateHealthCenterInput,
  CreateHealthCenterSpecialityInput,
  HealthCenter,
} from '@health-center';
import { EventBus } from '@nestjs/cqrs';
import { HealthCenterCreatedEvent } from './events/impl';

@Injectable()
export class HealthCenterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly serviceOwnership: ServiceOwnershipService,
    @Inject(ErrorHandlingService)
    private readonly errorService: ErrorHandlingTypedService,
    private readonly translationService: TranslationService,
    private readonly eventbus: EventBus,
  ) {}

  getLangId(): UserPreferedLang {
    return this.translationService.getLangIdFromLangHeader();
  }

  async createHealthCenterService(
    input: CreateHealthCenterInput,
    userId: string,
  ): Promise<HealthCenter> {
    await this.checkCreatePremission(userId);
    await this.validateInput(input);

    const { doctors, ...rest } = input;

    const created = await this.prisma.healthCenterService.create({
      data: {
        ...rest,
        ownerId: userId,
        doctors: {
          createMany: {
            data: doctors,
          },
        },
      },
      include: {
        doctors: {
          include: {
            speciality: true,
          },
        },
      },
    });

    this.eventbus.publish(new HealthCenterCreatedEvent(created));

    await this.serviceOwnership.createHealthCenterServiceOwnership({
      ownerId: userId,
      serviceId: created.id,
    });

    return this.formatHealthCenterService(created);
  }

  async createHealthCenterSpeciality(
    input: CreateHealthCenterSpecialityInput,
    userId: string,
  ): Promise<HealthCenterSpecialty> {
    try {
      const spec = await this.prisma.healthCenterSpecialty.create({
        data: input,
      });

      return this.formatHealthCenterDoctorSpeciality(spec);
    } catch (error) {
      throw new DBErrorException(
        this.errorService.getError(
          (v) => v.healthCenterSpecialityCreationDBErr,
        ),
      );
    }
  }

  async validateInput(input: CreateHealthCenterInput): Promise<Boolean> {
    const specialities = input.doctors.map((v) => v.specialityId);
    const validSpecialities = [];
    for (const id of specialities) {
      const spec = await this.getHealthCenterDoctorSpecialityById(id);
      validSpecialities.push(spec);
    }
    const everyValid = validSpecialities.every((v) => !!v);
    if (validSpecialities.length !== specialities.length || !everyValid)
      throw new BadRequestException(
        this.errorService.getError((v) => v.healthCenterSpecialityNotFoundErr),
      );

    return true;
  }
  async updateHealthCenter(input: UpdateHealthCenterInput, userId: string) {
    await this.checkModifyPremission(input.id, userId);
    try {
      const { id, ...rest } = input;
      await this.prisma.healthCenterService.update({
        where: {
          id,
        },
        data: {
          ...rest,
        },
      });
    } catch {
      throw new DBErrorException(this.errorService.getError((v) => v.DBError));
    }
  }

  async getHealthCenterDoctorSpecialityById(
    id: string,
  ): Promise<PrismaHealthCenterSpeciality> {
    return await this.prisma.healthCenterSpecialty.findUnique({
      where: {
        id,
      },
    });
  }

  async getHealthCenter(serviceId: string, userId?: string) {
    return this.checkViewPremissions(serviceId, userId);
  }

  async checkViewPremissions(
    serviceId: string,
    userId?: string,
  ): Promise<HealthCenter> {
    const service = await this.prisma.healthCenterService.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (service.status !== 'active')
      throw new ForbiddenException(
        this.errorService.getError((v) => v.serviceNotActiveErr),
      );
    return this.formatHealthCenterService(service);
  }

  async deleteHealthCenterService(
    serviceId: string,
    userId: string,
  ): Promise<HealthCenter> {
    await this.checkModifyPremission(serviceId, userId);
    try {
      const service = await this.prisma.healthCenterService.delete({
        where: {
          id: serviceId,
        },
      });

      return this.formatHealthCenterService(service);
    } catch (error) {
      throw new DBErrorException(this.errorService.getError((v) => v.DBError));
    }
  }

  async checkModifyPremission(
    serviceId: string,
    userId: string,
  ): Promise<HealthCenter> {
    const service = await this.prisma.healthCenterService.findUnique({
      where: {
        id: serviceId,
      },
    });
    if (service.ownerId !== userId)
      throw new ForbiddenException(
        this.errorService.getError((v) => v.forbiddenActionErr),
      );

    return this.formatHealthCenterService(service);
  }

  async checkCreatePremission(userId: string) {
    const hasService =
      !!(await this.serviceOwnership.getServiceOwnershipByUserId(userId));
    if (hasService)
      throw new ForbiddenException(
        this.errorService.getError((v) => v.serviceDuplicationErr),
      );
  }

  formatHealthCenterService(
    input: PrismaHealthCenterService & {
      doctors?: (PrismaHealthCenterDoctor & {
        speciality: PrismaHealthCenterSpeciality;
      })[];
    },
  ): HealthCenter {
    return {
      ...input,
      policies: getTranslatedResource({
        langId: this.getLangId(),
        resource: input.policies,
      }),
      serviceMetaInfo: getTranslatedResource({
        langId: this.getLangId(),
        resource: input.serviceMetaInfo,
      }),
      doctors: Array.isArray(input.doctors)
        ? input.doctors.map((v) => this.formatHealthCenterDoctor(v))
        : [],
    };
  }

  formatHealthCenterDoctor(
    input: PrismaHealthCenterDoctor & {
      speciality: PrismaHealthCenterSpeciality;
    },
  ): HealthCenterDoctor {
    return {
      ...input,
      description: getTranslatedResource({
        langId: this.getLangId(),
        resource: input.description,
      }),
      speciality: input.speciality
        ? this.formatHealthCenterDoctorSpeciality(input.speciality)
        : null,
    };
  }

  formatHealthCenterDoctorSpeciality(
    input: PrismaHealthCenterSpeciality,
  ): HealthCenterSpecialty {
    return {
      ...input,
      description: getTranslatedResource({
        langId: this.getLangId(),
        resource: input.description,
      }),
      name: getTranslatedResource({
        langId: this.getLangId(),
        resource: input.name,
      }),
    };
  }
}
