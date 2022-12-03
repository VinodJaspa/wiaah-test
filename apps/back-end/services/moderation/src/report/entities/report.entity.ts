import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ReportContentType } from 'prismaClient';

@ObjectType()
export class Report {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  reportedBy: string;

  @Field(() => ReportContentType)
  contentType: ReportContentType;

  @Field(() => String)
  message: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
