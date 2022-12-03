import { PrivacySettings } from 'prismaClient';

export class PrivacySettingsCreatedEvent {
  constructor(public readonly privacySettings: PrivacySettings) {}
}
