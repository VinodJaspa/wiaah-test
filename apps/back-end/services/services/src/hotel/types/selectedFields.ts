import { HotelRoom, HotelServiceEntity } from '@entities';
import { GqlSelectedFields } from 'nest-utils';

export type GqlHotelSelectedFields = GqlSelectedFields<HotelServiceEntity>;
export type GqlHotelRoomSelectedFields = GqlSelectedFields<HotelRoom>;
export type GqlHotelRoomAggregationSelectedFields = GqlSelectedFields<
  HotelRoom,
  false
>;
