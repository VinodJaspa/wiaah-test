export * from './impl';
import {
  ChangePasswordCommandHandler,
  ValidateLoginOtpCommandHandler,
} from './handlers';

export const AuthCommandHandlers = [
  ChangePasswordCommandHandler,
  ValidateLoginOtpCommandHandler,
];
