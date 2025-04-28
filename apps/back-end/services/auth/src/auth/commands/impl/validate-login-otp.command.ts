export class ValidateLoginOtpCommand {
  constructor(
    public readonly email: string,
    public readonly otp: string,
  ) {}
}
