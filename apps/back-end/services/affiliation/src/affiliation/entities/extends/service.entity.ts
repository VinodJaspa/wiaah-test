import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"type, id")')
export class Service {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => String)
  @Directive('@external')
  type: string;
}
