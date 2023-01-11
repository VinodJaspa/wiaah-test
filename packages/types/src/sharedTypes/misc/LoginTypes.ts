export interface LoginTypes {
  login: "login";
  buyer_signup: "buyer-signup";
  seller_signup: "seller-signup";
}

const loginTypes: LoginTypes = {
  login: "login",
  buyer_signup: "buyer-signup",
  seller_signup: "seller-signup",
};

export type LoginType =
  | "login"
  | "buyer-signup"
  | "seller-signup"
  | "email-verify";

export default loginTypes;
