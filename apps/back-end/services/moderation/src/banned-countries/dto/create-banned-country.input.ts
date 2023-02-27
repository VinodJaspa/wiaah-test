import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class BanCitiesInput {
  @Field(() => [ID])
  citiesIds: string[];
}
