import { AttachmentInput, HashtagInput } from '@input';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { PostVisibility } from 'prismaClient';

registerEnumType(PostVisibility, { name: 'PostVisibility' });

@InputType()
export class CreateNewsfeedPostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [AttachmentInput])
  attachments: AttachmentInput[];

  @Field(() => [HashtagInput])
  tags: HashtagInput[];

  @Field(() => PostVisibility)
  visibility: PostVisibility;
}
