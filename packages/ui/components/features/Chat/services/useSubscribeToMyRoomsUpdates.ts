import { ActiveStatus, Exact } from "@features/API";
import { createGraphQlSubscriptionClient } from "@UI/../api";
import React from "react";
import { useQueryClient } from "react-query";

export type ListenToMyRoomsSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type ListenToMyRoomsSubscription = {
  __typename?: "Subscription";
  listenToMyRoomsChanges: {
    __typename?: "ChatRoom";
    id: string;
    members: Array<{
      __typename?: "Account";
      profile?: {
        __typename?: "Profile";
        username: string;
        photo: string;
        activeStatus: ActiveStatus;
      } | null;
    }>;
  };
};

export const useSubscribeToMyRoomsUpdates = () => {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const client = createGraphQlSubscriptionClient();
    client.subscribe<
      ListenToMyRoomsSubscription,
      ListenToMyRoomsSubscriptionVariables
    >(
      `
subscription listenToMyRooms {
  listenToMyRoomsChanges {
    id
  }
}
`,
      {},
      // members {
      //   profile {
      //     username
      //     photo
      //     activeStatus
      //   }
      // }
      (data) => {
        console.log("recieved data", data);
      }
    );
  }, []);
};
