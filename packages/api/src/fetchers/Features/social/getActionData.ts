import { profileActionsPlaceholder } from "ui";

export const getActionData = (id: string) => {
  const actionIdx = profileActionsPlaceholder.findIndex(
    (action) => action.id === id
  );
  if (actionIdx < 0) throw new Error("action not found");
  return profileActionsPlaceholder[actionIdx];
};
