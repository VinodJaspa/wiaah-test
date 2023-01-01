import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetServiceQuery,
  GetServiceQueryRes,
} from '@service-discovery/queries/impl';
import { ServiceDiscoveryBaseQueryhandler } from '@service-discovery/abstraction';
import { ServicesTypes } from '@const';

@QueryHandler(GetServiceQuery)
export class GetServiceQueryHandler
  extends ServiceDiscoveryBaseQueryhandler
  implements IQueryHandler<GetServiceQuery>
{
  async execute({ id, type }: GetServiceQuery): Promise<GetServiceQueryRes> {
    switch (type) {
      case ServicesTypes.hotelRoom:
        const hotel = await this.prisma.hotelRoom.findUnique({
          where: {
            id,
          },
        });

        if (!hotel) return null;
        return {
          id: hotel.id,
          insuranceAmount: hotel.insurance,
          sellerId: hotel.sellerId,
        };
      case ServicesTypes.vehicle:
        const vehicle = await this.prisma.vehicle.findUnique({
          where: {
            id,
          },
          include: {
            parantService: true,
          },
        });
        if (!vehicle) return null;
        return {
          id: vehicle.id,
          insuranceAmount: vehicle.insurance,
          sellerId: vehicle.parantService.ownerId,
        };
      default:
        break;
    }
  }
}
