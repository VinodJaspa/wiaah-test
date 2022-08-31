import {
  createApiResponseValidationSchema,
  Location,
  Phone,
} from "../../../SharedSchema";
import { array, number, object, string } from "yup";
import { DateTypeValidationSchema } from "../../Services";
import { Cashback } from "../Products";

const ShippingMothedValidationSchema = object({
  name: string().required(),
  value: string().required(),
  deliveryTime: object({
    from: number().required(),
    to: number().required(),
  }).required(),
  id: string().required(),
  cost: number().required(),
  description: string().required(),
});

const ProductCheckoutDataValidationSchema = object({
  id: string().required(),
  name: string().required(),
  thumbnail: string().required(),
  qty: number().required(),
  shippingMethods: array()
    .of(ShippingMothedValidationSchema.required())
    .min(0)
    .required(),
  price: number().required(),
  location: Location().required(),
  size: string().required(),
  color: string().required(),
  discount: number().min(1).max(99).required(),
  cashback: Cashback().required(),
  description: string().required(),
});

export const OrderDetailsValidationSchema = object({
  orderId: string().required(),
  orderedDate: DateTypeValidationSchema.required(),
  deliveryDate: DateTypeValidationSchema.required(),
  products: array().of(ProductCheckoutDataValidationSchema).min(0).required(),
  deliveryAddress: Location().required(),
  phoneNumber: Phone().required(),
  deliveryCost: number().required(),
  tax: number().required(),
  discount: number().required(),
});

export const OrderDetailsApiResponseValidationSchema =
  createApiResponseValidationSchema(OrderDetailsValidationSchema);
