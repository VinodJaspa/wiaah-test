import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@extends')
export class ServicePost {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}
