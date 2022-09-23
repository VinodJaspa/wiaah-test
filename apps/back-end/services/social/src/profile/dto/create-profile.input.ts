import { InputType, Int, Field } from '@nestjs/graphql';
import { ProfileVisibility } from 'prismaClient';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  photo: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String)
  profession: string;

  @Field(() => ProfileVisibility, { nullable: true })
  visibility?: ProfileVisibility;
}
