import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ContentHostType } from 'prismaClient';

@ObjectType()
export class ContentView {
  @Field(() => String)
  id: string;

  @Field(() => String)
  viewerId: string;

  @Field(() => String)
  contentOnwerId: string;

  @Field(() => ContentHostType)
  contentType: ContentHostType;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

@ObjectType()
export class ContentHourlyAudinece {
  @Field(() => String)
  time: string;

  @Field(() => Int)
  maleAudiences: number;

  @Field(() => Int)
  femaleAudineces: number;
}
