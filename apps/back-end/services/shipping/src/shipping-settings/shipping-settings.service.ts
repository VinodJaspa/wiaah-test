import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_SERVICE_TOKEN } from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import { CreateShippingSettingInput } from './dto/create-shipping-setting.input';
import { ShippingSetting } from './entities/shipping-setting.entity';
import { ShippingSettingsNotFoundException } from './exceptions/ShippingSettingsNotFound.exception';

@Injectable()
export class ShippingSettingsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
  ) {}

  getAll(): Promise<ShippingSetting[]> {
    return this.prisma.shippingSettings.findMany({
      include: { shippingRules: true },
    });
  }

  createShippingSettings({
    ownerId,
    shippingRules,
    shopId,
  }: CreateShippingSettingInput): Promise<ShippingSetting> {
    return this.prisma.shippingSettings.create({
      data: {
        ownerId,
        shopId,
        shippingRules: {
          createMany: {
            data: shippingRules ? shippingRules : [],
          },
        },
      },
      select: {
        id: true,
        ownerId: true,
        shippingRules: true,
        shopId: true,
      },
    });
  }

  getOneByUserId(userId: string): Promise<ShippingSetting> {
    return this.prisma.shippingSettings.findUnique({
      where: {
        ownerId: userId,
      },
      include: {
        shippingRules: true,
      },
      rejectOnNotFound: () => {
        throw new ShippingSettingsNotFoundException('account id');
      },
    });
  }
}
