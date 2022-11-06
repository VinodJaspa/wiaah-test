import { AttachmentInput } from '@input';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateStoryInput {
  @Field(() => String, { nullable: true })
  referenceType?: string;

  @Field(() => ID, { nullable: true })
  referenceId?: string;

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => AttachmentInput, { nullable: true })
  attachment?: AttachmentInput;
}
