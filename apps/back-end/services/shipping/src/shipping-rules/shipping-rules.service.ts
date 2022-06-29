import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetUserShopMetaDataMessage,
  GetUserShopMetaDataMessageReply,
} from 'nest-dto';
import {
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
} from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import {
  ShippingRuleNotFoundException,
  ShippingRuleUnAuthorizedException,
} from './exceptions';
import { ShippingSettingsService } from 'src/shipping-settings/shipping-settings.service';
import { ShippingRule } from './entities/shipping-rule.entity';
import { CreateShippingRuleInput } from './dto/create-shipping-rule.input';
import { UpdateShippingSettingsRuleInput } from './dto/update-shipping-rule.input';

@Injectable()
export class ShippingRulesService {
  constructor(
    private readonly shippingSettingsService: ShippingSettingsService,
    private readonly prisma: PrismaService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
  ) {}

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

    if (!success) throw new Error(error);

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
