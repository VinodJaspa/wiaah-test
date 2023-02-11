import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AttachmentType, MarketingTagType } from 'prismaClient';
import { MarketingTag } from './post.entity';

registerEnumType(AttachmentType, { name: 'AttachmentType' });
registerEnumType(MarketingTagType, { name: 'MarketingTagType' });

@ObjectType()
export class Attachment {
  @Field(() => AttachmentType)
  type: AttachmentType;

  @Field(() => String)
  src: string;

  @Field(() => [MarketingTag])
  marketingTags: MarketingTag[];
}
