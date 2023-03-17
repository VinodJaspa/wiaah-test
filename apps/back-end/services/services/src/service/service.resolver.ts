import { Args, Mutation, Resolver, ResolveReference } from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { ServicePresentationType, ServiceType } from 'prismaClient';
import { CreateServiceInput } from './dto/create-service.input';
import { UseGuards } from '@nestjs/common';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { FileTypeEnum, UploadService } from '@wiaah/upload';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async createService(@Args('args') args: CreateServiceInput) {
    const {
      rooms,
      menus,
      doctors,
      treatments,
      vehicles,
      presentations,
      ...rest
    } = args;

    const servicePresenetations = await this.uploadService.uploadFiles(
      presentations.map((v) => ({
        file: {
          stream: v.file.createReadStream(),
          meta: {
            name: v.file.filename,
            mimetype: v.file.mimetype,
          },
        },
        options: {
          allowedMimtypes: [
            ...this.uploadService.mimetypes.image.all,
            ...this.uploadService.mimetypes.videos.all,
          ],
          maxSecDuration: 60 * 10 * 1000,
        },
      })),
    );

    const res = await this.prisma.service.create({
      data: {
        ...rest,
        presentations: servicePresenetations.map((v) => ({
          src: v.src,
          type:
            v.mimetype === FileTypeEnum.video
              ? ServicePresentationType.vid
              : ServicePresentationType.img,
        })),
      },
    });

    if (rooms) {
      await this.prisma.hotelRoom.createMany({
        data: rooms.map((v) => ({
          ...v,
          hotelId: res.id,
          sellerId: res.ownerId,
          presentations: [],
        })),
      });
    }

    if (menus) {
      await this.prisma.restaurantMenu.createMany({
        data: menus.map((v) => ({ ...v, restaurantId: res.id })),
      });
    }

    if (doctors) {
      await this.prisma.healthCenterDoctor.createMany({
        data: await Promise.all(
          doctors.map(async (v) => {
            const file = v.thumbnail.file;
            const thumbnail = await this.uploadService.uploadFiles([
              {
                file: {
                  stream: file.createReadStream(),
                  meta: {
                    mimetype: file.mimetype,
                    name: file.filename,
                  },
                },
                options: {
                  allowedMimtypes: [...this.uploadService.mimetypes.image.all],
                  maxSizeKb: 10 * 1000,
                },
              },
            ]);

            const src = thumbnail[0];

            return {
              ...v,
              healthCenterId: res.id,
              thumbnail: src.src,
            };
          }),
        ),
      });
    }

    if (treatments) {
      await this.prisma.beautyCenterTreatment.createMany({
        data: treatments.map((v) => ({ ...v })),
      });
    }

    if (vehicles) {
      await this.prisma.vehicle.createMany({
        data: vehicles.map((v) => ({
          ...v,
          parantServiceId: res.id,
          presentations: [],
        })),
      });
    }

    return true;
  }

  @ResolveReference()
  reslove(ref: { id: string; type: ServiceType }) {
    return this.serviceService.getServiceByIdAndType(ref?.id, ref?.type);
  }
}
