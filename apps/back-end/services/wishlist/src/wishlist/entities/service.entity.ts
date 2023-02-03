import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@keys(fields: "id")')
export class Service {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}
