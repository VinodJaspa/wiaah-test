export * from './impl';
import {
  IncreamentUserCommentReactionInteractionCommandHandler,
  IncreamentUserPostReactionInteractionCommandHandler,
  IncrementCommentsCommandHandler,
  IncrementUserMessagesInteractionCommandHandler,
  IncrementUserSharesInteractionCommandHandler,
  IncrementUserMentionInteractionCommandHandler,
  DecrementUsersInteractionScoreCommandHandler,
  IncrementUserReviewedItemsCommandHandler,
  IncrementUserProfileVisitsInteractionCommandHandler,
  IncrementUserPostSaveInteractionCommandHandler,
} from './handlers';

export const analyticsCommandHandlers = [
  IncreamentUserPostReactionInteractionCommandHandler,
  IncrementCommentsCommandHandler,
  IncrementUserMessagesInteractionCommandHandler,
  IncreamentUserCommentReactionInteractionCommandHandler,
  IncrementUserSharesInteractionCommandHandler,
  IncrementUserMentionInteractionCommandHandler,
  DecrementUsersInteractionScoreCommandHandler,
  IncrementUserReviewedItemsCommandHandler,
  IncrementUserProfileVisitsInteractionCommandHandler,
  IncrementUserPostSaveInteractionCommandHandler,
];
