export * from './impl';
import {
  ProvideVVCPictureCommandHandler,
  RequestIdentityVerificationCommandHandler,
} from './handlers';

export const idCommandHandlers = [
  ProvideVVCPictureCommandHandler,
  RequestIdentityVerificationCommandHandler,
];
