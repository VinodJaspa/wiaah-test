import { object, string } from "yup";

export const SocialSubscriberValidationSchema = object({
  id: string().required(),
  name: string().required(),
  thumbnail: string().required(),
});
