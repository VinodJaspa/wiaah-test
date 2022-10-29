import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetUserShopMetaDataMessage,
  GetUserShopMetaDataMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import {
  ShippingRuleNotFoundException,
  ShippingRuleUnAuthorizedException,
} from './exceptions';
import { ShippingSettingsService } from '@shipping-settings';
import { ShippingRule } from './entities/shipping-rule.entity';
import { CreateShippingRuleInput } from './dto/create-shipping-rule.input';
import { UpdateShippingSettingsRuleInput } from './dto/update-shipping-rule.input';

@Injectable()
export class ShippingRulesService {
  constructor(
    private readonly shippingSettingsService: ShippingSettingsService,
    private readonly prisma: PrismaService,
    @Inject(SERVICES.SHIPPING_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  getShippingRuleById(id: string): Promise<ShippingRule> {
    return this.prisma.shippingRule.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: () => {
        throw new ShippingRuleNotFoundException('id');
      },
    });
  }

  getShippingRulesByIds(ids: string[] = []): Promise<ShippingRule[]> {
    return this.prisma.shippingRule.findMany({
      where: {
        AND: [
          {
            id: {
              in: ids,
            },
          },
        ],
      },
      take: ids.length,
    });
  }

  async addShippingRule(
    userId: string,
    rule: CreateShippingRuleInput,
  ): Promise<ShippingRule> {
    const shippingSettings = await this.prisma.shippingSettings.findUnique({
      where: {
        ownerId: userId,
      },
    });

    if (shippingSettings) {
      return this.prisma.shippingRule.create({
        data: {
          ...rule,
          shippingSettingsId: shippingSettings.id,
        },
        select: {
          cost: true,
          id: true,
          countries: true,
          shippingTypes: true,
        },
      });
    }

    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      any,
      GetUserShopMetaDataMessage,
      GetUserShopMetaDataMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.SHOP_MESSAGES.getShopMetaData,
      new GetUserShopMetaDataMessage({ accountId: userId }),
    );

    if (!success) throw new Error(error.message);

    const { shopId } = data;

    await this.shippingSettingsService.createShippingSettings({
      ownerId: userId,
      shippingRules: [rule],
      shopId,
    });
  }

  async updateShippingRule(
    accountId: string,
    updateInput: UpdateShippingSettingsRuleInput,
  ): Promise<ShippingRule> {
    const settingsRule = await this.prisma.shippingRule.findUnique({
      where: {
        id: updateInput.id,
      },
      include: {
        ShippingSettings: {
          select: {
            ownerId: true,
          },
        },
      },
      rejectOnNotFound(error) {
        throw new ShippingRuleNotFoundException('id');
      },
    });

    const {
      ShippingSettings: { ownerId },
    } = settingsRule;

    if (ownerId !== accountId) throw new ShippingRuleUnAuthorizedException();

    const { id, cost, countries, shippingTypes } = updateInput;

    return this.prisma.shippingRule.update({
      where: {
        id,
      },
      data: {
        cost,
        countries,
        shippingTypes,
      },
    });
  }

  async deleteShippingRule(accountId: string, shippingRuleId: string) {
    const shippingRule = await this.prisma.shippingRule.findUnique({
      where: {
        id: shippingRuleId,
      },
      include: {
        ShippingSettings: {
          select: {
            ownerId: true,
          },
        },
      },
      rejectOnNotFound: () => {
        throw new ShippingRuleNotFoundException('id');
      },
    });
    const {
      ShippingSettings: { ownerId },
    } = shippingRule;
    if (accountId !== ownerId) throw new ShippingRuleUnAuthorizedException();

    await this.prisma.shippingRule.delete({
      where: {
        id: shippingRuleId,
      },
    });

    return true;
  }
}
