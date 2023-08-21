import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
export class Filter {
  @Field((type) => String)
  title: string;
}

@ObjectType()
export class Search {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  thumbnail?: string;
}
