import { ServicePresentation } from '@entities';
import { Directive, Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ServiceType } from 'prismaClient';

@ObjectType()
@Directive('@key(fields:"id, serviceType")')
export class Service {
  @Field(() => ID)
  id: string;

  @Field(() => ServiceType)
  serviceType: ServiceType;

  @Field(() => String)
  title: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  rating: number;

  @Field(() => String)
  thumbnail: string;

  @Field(() => [ServicePresentation], { nullable: true })
  presentation?: ServicePresentation[];

  @Field(() => [String])
  hashtags: string[];
}
