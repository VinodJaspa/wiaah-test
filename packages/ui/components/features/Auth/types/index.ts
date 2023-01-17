type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GqlStatusResponse = {
  __typename?: "GqlStatusResponse";
  code: Scalars["Int"];
  message?: Maybe<Scalars["String"]>;
  success: Scalars["Boolean"];
};

export type AccountInputData = {
  __typename?: "AccountInputData";
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
};

export type Registeration = {
  __typename?: "Registeration";
  id: Scalars["ID"];
  verificationToken: Scalars["String"];
  email: Scalars["String"];
  accountInputData: AccountInputData;
};

export type Query = {
  __typename?: "Query";
  getRegistrations: Array<Registeration>;
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword: Scalars["Boolean"];
  login: GqlStatusResponse;
  verifyLoginOTP: GqlStatusResponse;
  verifyEmail: Scalars["Boolean"];
  resendRegisterationCode: Scalars["Boolean"];
  resetPassword: Scalars["Boolean"];
  verifyNewPassword: Scalars["Boolean"];
  loginAs: GqlStatusResponse;
};

export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};

export type MutationLoginArgs = {
  LoginInput: LoginDto;
};

export type MutationVerifyLoginOtpArgs = {
  args: LoginWithOtpInput;
};

export type MutationVerifyEmailArgs = {
  EmailVerificationInput: VerifyEmailDto;
};

export type MutationResendRegisterationCodeArgs = {
  email: Scalars["String"];
};

export type MutationResetPasswordArgs = {
  ResetPasswordArgs: ForgotPasswordEmailInput;
};

export type MutationVerifyNewPasswordArgs = {
  verifyNewPassword: ConfirmPasswordChangeInput;
};

export type MutationLoginAsArgs = {
  userId: Scalars["String"];
};

export type ChangePasswordInput = {
  currentPassword: Scalars["String"];
  newPassword: Scalars["String"];
  confirmNewPassword: Scalars["String"];
};

export type LoginDto = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginWithOtpInput = {
  email: Scalars["String"];
  otp: Scalars["String"];
};

export type VerifyEmailDto = {
  verificationCode: Scalars["String"];
};

export type ForgotPasswordEmailInput = {
  email: Scalars["String"];
};

export type ConfirmPasswordChangeInput = {
  email: Scalars["String"];
  verificationCode: Scalars["String"];
  newPassword: Scalars["String"];
  confirmNewPassword: Scalars["String"];
};
