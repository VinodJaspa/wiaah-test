import {
  createApiResponseValidationSchema,
  Location,
  Phone,
} from "../../../SharedSchema";
import { array, number, object, string } from "yup";
import { DateTypeValidationSchema } from "../../Services";

export const OrderDetailsValidationSchema = object({
  orderId: string().required(),
  orderedDate: DateTypeValidationSchema.required(),
  deliveryDate: DateTypeValidationSchema.required(),
  products: array()
    .of(
      object({
        price: number().required(),
        qty: number().required(),
        name: string().required(),
        props: array(string().required()).min(0).required(),
        thumbnail: string().required(),
      })
    )
    .min(0)
    .required(),
  deliveryAddress: Location().required(),
  phoneNumber: Phone().required(),
  deliveryCost: number().required(),
  tax: number().required(),
  discount: number().required(),
});

export const OrderDetailsApiResponseValidationSchema =
  createApiResponseValidationSchema(OrderDetailsValidationSchema);
