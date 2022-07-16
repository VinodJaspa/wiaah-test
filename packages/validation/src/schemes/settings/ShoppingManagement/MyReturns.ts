import { AskForReturnDto } from "dto";
import * as yup from "yup";

export const AskForReturnValidationSchema: yup.SchemaOf<AskForReturnDto> = yup
  .object()
  .shape({
    productId: yup.string().required(),
    otherReason: yup.string(),
    reason: yup.string().required(),
  });
