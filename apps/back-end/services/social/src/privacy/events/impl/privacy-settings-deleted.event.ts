import { PrivacySettings } from 'prismaClient';

export class PrivacySettingsDeletedEvent {
  constructor(public readonly privacySettings: PrivacySettings) {}
}
