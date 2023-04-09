import { QueryBase } from 'nest-utils';
import { GqlHotelRoomSelectedFields } from '../../types';

export class GetHotelByIdQuery extends QueryBase<
  {
    roomId: string;
    userId: string;
  },
  GqlHotelRoomSelectedFields
> {}
