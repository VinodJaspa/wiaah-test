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
