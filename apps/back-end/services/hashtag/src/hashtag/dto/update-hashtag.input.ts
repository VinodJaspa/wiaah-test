import {
  Field,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { HashtagStatus } from '@prisma-client';

registerEnumType(HashtagStatus, { name: 'HashtagStatus' });

@InputType()
class input {
  @Field(() => HashtagStatus)
  status: HashtagStatus;
}

@InputType()
export class UpdateHashtagInput extends PartialType(input) {
  @Field(() => String)
  tag: string;
}
