import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetServicesOpenTimeDataMessage,
  GetServicesOpenTimeDataMessageReply,
  GetShopOpenTimeMessage,
  GetShopOpenTimeMessageReply,
} from 'nest-dto';
import {
  DeepRequired,
  isWithinTime,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { isArray } from 'util';
import * as yup from 'yup';

import { Localization, OpenTime } from '../entities';
import { SearchElasticRepository } from './property.elastic.repository';

const schema = yup
  .object({
    id: yup.string().required(),
    isOpen: yup.boolean().required(),
    location: yup
      .object({
        city: yup.string().required(),
      })
      .required(),
    type: yup.string(),
    openTime: yup.object({
      from: yup.date(),
      to: yup.date(),
    }),
    sellerId: yup.string(),
    thumbnail: yup.string(),
  })
  .required();

type SchemaType = yup.InferType<typeof schema>;

@Injectable()
export class SearchRepository {
  constructor(
    @Inject(SERVICES.SEARCH_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly elasticRepo: SearchElasticRepository,
  ) {}
  servicesTypes = [
    'hotel',
    'restaurant',
    'health-center',
    'beauty-center',
    'holiday-rentals',
    'vehicle',
  ];
  shopTypes = ['shop'];

  async getLocalizationsBySearchQuery(
    query: string,
    langId: string,
  ): Promise<Localization[]> {
    console.log('places repo');
    const ids = await this.elasticRepo.getPropertiesIdsAndTypesByLocationQuery(
      query,
    );

    const filteredIds = ids.reduce((acc, curr) => {
      const typeAcc = Array.isArray(acc[curr.type]) ? [...acc[curr.type]] : [];
      return { ...acc, [curr.type]: [...typeAcc, curr.dbId] };
    }, {} as Record<string, string[]>);

    const validData: Localization[] = [];

    for (const type in filteredIds) {
      if (this.servicesTypes.includes(type)) {
        const {
          results: { data, success },
        } = await KafkaMessageHandler<
          string,
          GetServicesOpenTimeDataMessage,
          GetServicesOpenTimeDataMessageReply
        >(
          this.eventClient,
          KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceOpenTimeData(type),
          new GetServicesOpenTimeDataMessage({
            services: filteredIds[type].map((v) => ({ id: v, type })),
          }),
        );
        if (success) {
          const formatedData: SchemaType[] = data.services.map((v) => ({
            openTime: v.openTime,
            sellerId: v.sellerId,
            isOpen: isWithinTime(v.openTime.from, v.openTime.to),
            id: v.id,
            location: v.location,
            thumbnail: v.thumbnail,
            type: v.type,
          }));
          // .filter((v) => this.validateOpenTimeData(v));
          formatedData.map((v) =>
            validData.push({
              city: v.location.city,
              isOpen: v.isOpen,
              sellerId: v.sellerId,
              propertyType: v.type,
              openTime: v.openTime,
              thumbnail: v.thumbnail,
              id: v.id,
            }),
          );
        }
      }
      if (this.shopTypes.includes(type)) {
        const {
          results: { data, success },
        } = await KafkaMessageHandler<
          string,
          GetShopOpenTimeMessage,
          GetShopOpenTimeMessageReply
        >(
          this.eventClient,
          KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceOpenTimeData(type),
          new GetShopOpenTimeMessage({
            ids: filteredIds[type],
          }),
        );
        if (success) {
          const formatedData: SchemaType[] = data.shops.map((v) => ({
            openTime: v.openTime,
            sellerId: v.sellerId,
            isOpen: isWithinTime(v.openTime.from, v.openTime.to),
            id: v.id,
            location: v.location,
            thumbnail: v.thumbnail,
            type: 'shop',
          }));
          // .filter((v) => this.validateOpenTimeData(v));
          formatedData.map((v) =>
            validData.push({
              city: v.location.city,
              isOpen: v.isOpen,
              sellerId: v.sellerId,
              propertyType: v.type,
              openTime: v.openTime,
              thumbnail: v.thumbnail,
              id: v.id,
            }),
          );
        }
      }
    }

    return validData;
  }

  async searchPropertiesByPlaceType(query: string, langId: string) {
    console.log('places test');
    const { ids, type } = await this.elasticRepo.getPropertiesIdsByTypeQuery(
      query,
    );

    const validData = [];

    if (this.servicesTypes.includes(type)) {
      const {
        results: { data, success },
      } = await KafkaMessageHandler<
        string,
        GetServicesOpenTimeDataMessage,
        GetServicesOpenTimeDataMessageReply
      >(
        this.eventClient,
        KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceOpenTimeData(type),
        new GetServicesOpenTimeDataMessage({
          services: ids.map((v) => ({ id: v, type })),
        }),
      );
      if (success) {
        const formatedData: SchemaType[] = data.services.map((v) => ({
          openTime: v.openTime,
          sellerId: v.sellerId,
          isOpen: isWithinTime(v.openTime.from, v.openTime.to),
          id: v.id,
          location: v.location,
          thumbnail: v.thumbnail,
          type: 'shop',
        }));
        validData.concat(
          formatedData.map((v) => ({
            city: v.location.city,
            isOpen: v.isOpen,
            sellerId: v.sellerId,
            propertyType: v.type,
            openTime: v.openTime,
            thumbnail: v.thumbnail,
          })),
        );
      }
    }
    if (this.shopTypes.includes(type)) {
      const {
        results: { data, success },
      } = await KafkaMessageHandler<
        string,
        GetShopOpenTimeMessage,
        GetShopOpenTimeMessageReply
      >(
        this.eventClient,
        KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceOpenTimeData(type),
        new GetShopOpenTimeMessage({
          ids,
        }),
      );

      if (success) {
        validData.concat(
          data.shops
            .filter((v) => this.validateOpenTimeData(v))
            .map((v) => ({
              city: v.location.city,
              openTime: v.openTime,
              sellerId: v.sellerId,
              propertyType: type,
              isOpen: isWithinTime(v.openTime.from, v.openTime.to),
            })),
        );
      }
    }
  }

  validateOpenTimeData(data: any): boolean {
    return schema.isValidSync(data);
  }
}
