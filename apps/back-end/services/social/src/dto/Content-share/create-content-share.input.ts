import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { ContentHostType } from 'prismaClient';

@InputType()
export class CreateContentShareInput {
  @Field(() => ID)
  contentId: string;

  @Field(() => ContentHostType)
  contentType: ContentHostType;
}
