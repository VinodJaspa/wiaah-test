export class AuthOtpRequestedEvent {
  constructor(public readonly email: string, public readonly code: number) {}
}
