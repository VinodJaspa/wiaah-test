import { Follow } from 'prismaClient';

export class UpdateUserFollowerStoryLastSeenAtCommand {
  constructor(public usersRelations: Follow) {}
}
