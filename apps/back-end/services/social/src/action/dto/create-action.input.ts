import { PostLocationInput } from '@input';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { ActionType, CommentsVisibility } from 'prismaClient';
import { IsDomain } from 'nest-utils';

const domains = process.env.FRONTEND_DOMAINS;

registerEnumType(ActionType, { name: 'ActionType' });
@InputType()
export class CreateActionInput {
  @Field(() => String)
  srcUploadId: string;

  @Field(() => String)
  coverUploadId: string;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  mentions: string[];

  @Field(() => [String], { nullable: true, defaultValue: [] })
  tags: string[];

  @Field(() => String, { nullable: true })
  @IsDomain(domains.split(','))
  link?: string;

  @Field(() => PostLocationInput, { nullable: true })
  location?: PostLocationInput;

  @Field(() => CommentsVisibility, { nullable: true })
  commentsVisibility?: CommentsVisibility;

  @Field(() => [ActionType])
  allowedActions: ActionType[];
}
