export interface ChatNewMessageUserInfo {
  userPhoto: string;
  username: string;
  name: Name;
  id: string;
}

export type Name = {
  first: string;
  last: string;
};
