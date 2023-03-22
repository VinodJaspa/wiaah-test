import { CreateActionInput } from '@action/dto';
import { PostLocationInput } from '@input';
import { ActionType, CommentsVisibility } from 'prismaClient';

export class CreateActionCommand {
  constructor(
    public readonly input: {
      location?: PostLocationInput;
      commentsVisibility?: CommentsVisibility;
      link?: string;
      allowedActions: ActionType[];
      actionSrc: string;
      actionCoverSrc: string;
    },
    public readonly userId: string,
  ) {}
}
