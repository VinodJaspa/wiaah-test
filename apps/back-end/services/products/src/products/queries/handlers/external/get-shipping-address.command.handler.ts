import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetShippingAddressQuery,
  ShippingAddressQueryRes,
} from '@products/queries/impl';
import { PrismaService } from 'prismaService';

@QueryHandler(GetShippingAddressQuery)
export class GetShippingAddressCommandHandler
  implements IQueryHandler<GetShippingAddressQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute({
    id,
  }: GetShippingAddressQuery): Promise<ShippingAddressQueryRes> {
    const res = await this.prisma.shippingAddress.findUnique({
      where: {
        id,
      },
    });
    if (!res) return null;
    const {
      location: { address, city, country, state },
      geoLocation,
      ownerId,
    } = res;
    return {
      country,
      state,
      city,
      address,
      coords: {
        long: geoLocation.coordinates[0],
        lat: geoLocation.coordinates[1],
      },
      address_full: `${address}, ${state}, ${city}, ${country}`,
      ownerId,
    };
  }
}
