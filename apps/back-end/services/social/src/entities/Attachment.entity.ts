import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AttachmentType } from 'prismaClient';

registerEnumType(AttachmentType, { name: 'AttachmentType' });

@ObjectType()
export class Attachment {
  @Field(() => AttachmentType)
  type: AttachmentType;

  @Field(() => String)
  src: string;
}
