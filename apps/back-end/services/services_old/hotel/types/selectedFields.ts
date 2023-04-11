import { HotelRoom, Hotel } from '@entities';
import { GqlSelectedFields } from 'nest-utils';

export type GqlHotelSelectedFields = GqlSelectedFields<Hotel>;
export type GqlHotelRoomSelectedFields = GqlSelectedFields<HotelRoom>;
export type GqlHotelRoomAggregationSelectedFields = GqlSelectedFields<
  HotelRoom,
  false
>;
