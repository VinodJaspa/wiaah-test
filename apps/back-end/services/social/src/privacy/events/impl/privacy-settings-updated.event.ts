import { PrivacySettings } from 'prismaClient';

export class PrivacySettingsUpdatedEvent {
  constructor(public readonly privacySettings: PrivacySettings) {}
}
