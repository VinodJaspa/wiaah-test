import { TranslationText } from '@entities';
import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { ServiceFilterSelectionType } from 'prismaClient';

registerEnumType(ServiceFilterSelectionType, {
  name: 'ServiceFilterSelectionType',
});

@ObjectType()
export class ServiceFilterValueRaw {
  @Field(() => [TranslationText])
  name: TranslationText[];

  @Field(() => String)
  filteringValue: string;

  @Field(() => Int)
  sortOrder: number;
}

@ObjectType()
export class ServiceFilterRaw {
  @Field(() => String)
  id: string;

  @Field(() => [TranslationText])
  filterGroupName: TranslationText[];

  @Field(() => String)
  filteringKey: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ServiceFilterValueRaw])
  filterValues: ServiceFilterValueRaw[];

  @Field(() => ServiceFilterSelectionType)
  selectionType: ServiceFilterSelectionType;
}

@ObjectType()
export class ServiceFilterValue {
  @Field(() => String)
  name: string;

  @Field(() => String)
  filteringValue: string;

  @Field(() => Int)
  sortOrder: number;
}

@ObjectType()
export class ServiceFilter {
  @Field(() => String)
  id: string;

  @Field(() => String)
  filterGroupName: string;

  @Field(() => String)
  filteringKey: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ServiceFilterValue])
  filterValues: ServiceFilterValue[];

  @Field(() => ServiceFilterSelectionType)
  selectionType: ServiceFilterSelectionType;
}
