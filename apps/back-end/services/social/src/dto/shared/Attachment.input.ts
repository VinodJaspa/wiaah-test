import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { AttachmentType, MarketingTagType } from 'prismaClient';

@InputType()
export class AttachmentMarketingTagInput {
  @Field(() => String)
  id: string;

  @Field(() => MarketingTagType)
  type: MarketingTagType;

  @Field(() => Float)
  x: number;

  @Field(() => Float)
  y: number;
}

@InputType()
export class AttachmentInput {
  @Field(() => AttachmentType)
  type: AttachmentType;

  @Field(() => String)
  src: string;

  @Field(() => [AttachmentMarketingTagInput])
  marketingTags: AttachmentMarketingTagInput[];
}
