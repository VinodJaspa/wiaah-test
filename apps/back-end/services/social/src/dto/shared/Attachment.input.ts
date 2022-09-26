import { Field, InputType } from '@nestjs/graphql';
import { AttachmentType } from 'prismaClient';

@InputType()
export class AttachmentInput {
  @Field(() => AttachmentType)
  type: AttachmentType;

  @Field(() => String)
  src: string;
}
