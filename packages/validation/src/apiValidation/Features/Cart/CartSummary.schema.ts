import { CreatePaginationApiResponseValidationSchemaOf } from "../../SharedSchema";
import { mixed, object, string } from "yup";
import { CheckoutDataValidationTester } from "../Services/Checkout/Checkout";

export const CartSummaryItemDataValidationSchema = object({
  itemData: CheckoutDataValidationTester.required(),
  providerData: object({
    id: string().required(),
    thumbnail: string().required(),
    name: string().required(),
    type: mixed<"shop" | "service">().oneOf(["service", "shop"]),
  }),
});

export const MyCartSummaryApiResponseValidationSchema =
  CreatePaginationApiResponseValidationSchemaOf(
    CartSummaryItemDataValidationSchema
  );
