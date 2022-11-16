export * from './impl';
import {
  UpdateUserPrivacySettingsCommandHandler,
  CreateUserPrivacySettingsCommandHandler,
  DeleteUserPrivacySettingsCommandHandler,
} from './handlers';

export const privacySettingsCommandHandlers = [
  UpdateUserPrivacySettingsCommandHandler,
  CreateUserPrivacySettingsCommandHandler,
  DeleteUserPrivacySettingsCommandHandler,
];
