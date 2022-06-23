import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';

@ObjectType()
export class Filter {
  @Field((type) => String)
  title: string;
}

@ObjectType()
@Directive('@key(fields: "filter")')
export class Search {
  @Field((type) => String)
  filter: string;
}
