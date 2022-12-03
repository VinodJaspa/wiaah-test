import { PostTag } from '@entities';
import { AttachmentInput, PostTagInput } from '@input';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateStoryInput {
  @Field(() => ID, { nullable: true })
  productId?: string;

  @Field(() => ID, { nullable: true })
  newsfeedPostId?: string;

  @Field(() => ID, { nullable: true })
  shopPostId?: string;

  @Field(() => ID, { nullable: true })
  affiliationPostId?: string;

  @Field(() => ID, { nullable: true })
  servicePostId?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => AttachmentInput, { nullable: true })
  attachment?: AttachmentInput;

  @Field(() => [PostTagInput], { defaultValue: [] })
  tags: PostTagInput[];
}
