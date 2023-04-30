import { Field, InputType } from '@nestjs/graphql';
import { GqlCursorPaginationInput } from 'nest-utils';
import { ServiceType } from 'prismaClient';

@InputType()
export class GetRecommendedServicesInput extends GqlCursorPaginationInput {
  @Field(() => ServiceType)
  type: ServiceType;
}
