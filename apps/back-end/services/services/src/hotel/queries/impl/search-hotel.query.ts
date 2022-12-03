import { QueryBase } from 'nest-utils';
import { SearchHotelRoomLocationInput } from '../../dto';
import { GqlHotelRoomAggregationSelectedFields } from '../../types/selectedFields';

export class SearchHotelRoomQuery extends QueryBase<
  SearchHotelRoomLocationInput,
  GqlHotelRoomAggregationSelectedFields
> {}
