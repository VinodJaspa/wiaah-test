import * as yup from "yup";
import { declineReturnRequestDto } from "dto";
export const ReturnDeclineRequestValidationSchema: yup.SchemaOf<declineReturnRequestDto> =
  yup.object().shape({
    requestId: yup.string().required(),
    declineReason: yup.string().required(),
  });
