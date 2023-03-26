export const FEATURES_EVENT_TRIGGER_ID = {
  order: (id: string, event: string) => `order-${event}-${id}`,
  refund: (id: string, event: string) => `refund-${event}-${id}`,
  newsfeedPost: (id: string, event: string) => `newsfeedPost-${event}-${id}`,
  accounts: (id: string, event: string) => `accounts-${event}-${id}`,
};
