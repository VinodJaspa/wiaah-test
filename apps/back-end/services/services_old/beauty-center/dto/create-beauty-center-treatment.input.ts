import { SERVICE_MIN_PRICE } from "@const";
import { TranslationsInput } from "@decorators";
import { ServiceDiscountInput, TranslationTextInput } from "@dto";
import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";
import { Min } from "class-validator";
import { GraphQLUpload, Upload } from "graphql-upload-ts";

@InputType()
export class CreateBeautyCenterTreatmentInput {
  @Field(() => ID)
  treatmentCategoryId: string;

  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  title: TranslationTextInput[];

  @Field(() => Float)
  @Min(SERVICE_MIN_PRICE)
  price: number;

  @Field(() => [Int])
  duration: number[];

  @Field(() => ServiceDiscountInput)
  discount: ServiceDiscountInput;

  @Field(() => GraphQLUpload)
  thumbnail: Upload;
}
