import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSocialLink {
  @Field(() => String)
  label: string;

  @Field(() => String)
  link: string;

  @Field(() => [String])
  placements: string[];
}

@InputType()
export class UpdateSiteSocialInput {
  @Field(() => [UpdateSocialLink])
  socialLinks: UpdateSocialLink[];
}
