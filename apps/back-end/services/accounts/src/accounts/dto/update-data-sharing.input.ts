// src/account/dto/update-data-sharing.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataSharingInput {
  @Field({ nullable: true })
  shareAdPartners?: boolean;

  @Field({ nullable: true })
  shareAnalyticsTools?: boolean;

  @Field({ nullable: true })
  shareSocialNetworks?: boolean;

  @Field({ nullable: true })
  sharePaymentProcessors?: boolean;
}
