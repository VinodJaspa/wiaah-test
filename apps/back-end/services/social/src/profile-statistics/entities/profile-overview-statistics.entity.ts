import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';

@ObjectType()
export class ProfileOverviewStatistics {
  @Field(() => Int)
  reached: number;

  @Field(() => Int)
  engaged: number;

  @Field(() => Int)
  activity: number;
}
