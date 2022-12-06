import { ProfileStatus } from 'prismaClient';

export class UpdateProfileStatusCommand {
  constructor(
    public readonly profileId: string,
    public readonly status: ProfileStatus,
  ) {}
}
