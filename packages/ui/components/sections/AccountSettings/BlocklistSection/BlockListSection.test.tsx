import React from "react";
import { shallow, mount, ReactWrapper } from "enzyme";
import { BlocklistSection } from "./index";
import * as apiHooks from "@UI/src/Hooks/ApiHooks";
import { getTestId, waitFor } from "utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { BlocklistUserInfo } from "types";

const testIds = {
  blockedUserCard: "BlockedUserCard",
  UnfollowBtn: "UnFollowBtn",
};

describe("BlockListSection functionallity tests", () => {
  let wrapper: ReactWrapper;
  let blockedUserCards: ReactWrapper;
  let useUnFollowMockFn: jest.Mock;
  let unFollowMutationMockFn: jest.Mock;

  beforeEach(() => {
    useUnFollowMockFn = jest.fn();
    wrapper = mount(
      <QueryClientProvider client={new QueryClient()}>
        <BlocklistSection />
      </QueryClientProvider>,
    );
    blockedUserCards = wrapper.find(getTestId(testIds.blockedUserCard));
  });

  it("should render the blocked users list after a while", async () => {
    jest.mock("ui/Hooks", (): typeof apiHooks => {
      return {
        ...jest.requireActual("ui/Hooks"),
        useGetBlockedUsersQuery: jest.fn().mockReturnValue({
          isLoading: false,
          data: [
            {
              id: "1",
              name: "Wiaah",
              photo: "/wiaah_logo.png",
            },
            {
              id: "2",
              name: "seller",
              photo: "/shop.jpeg",
            },
            {
              id: "3",
              name: "buyer",
              photo: "/shop-2.jpeg",
            },
            {
              id: "4",
              name: "username",
              photo: "/shop-3.jpeg",
            },
            {
              id: "5",
              name: "wiaah",
              photo: "/place-1.jpg",
            },
            {
              id: "6",
              name: "Wiaah",
              photo: "/place-2.jpg",
            },
          ] as BlocklistUserInfo[],
          isError: false,
        }),
      };
    });
    expect(blockedUserCards.length).toBe(0);
    expect(wrapper.text()).toContain("loading");

    await waitFor(() => {
      wrapper.update();
      blockedUserCards = wrapper.find(getTestId(testIds.blockedUserCard));
      expect(blockedUserCards.length).toBe(6);
      expect(wrapper.text()).not.toContain("loading");
    });
  });

  it("should call the mutate fn inside useUnFollowUserMutation with the right info", async () => {
    const mock = jest.fn();
    jest.mock("ui/Hooks", (): typeof apiHooks => {
      return {
        ...jest.requireActual("ui/Hooks"),
        useUnFollowUserMutation: jest.fn().mockReturnValue({
          mutate: mock,
        }),
      };
    });

    await waitFor(() => {
      wrapper.update();
      blockedUserCards = wrapper.find(getTestId(testIds.blockedUserCard));
      expect(blockedUserCards.length).toBe(6);
      expect(wrapper.text()).not.toContain("loading");
    });
    await waitFor(() => {
      const unFollowBtns = wrapper.find(getTestId(testIds.UnfollowBtn));
      expect(unFollowBtns.length).toBe(6);
      unFollowBtns.at(5).simulate("click");
    });
    await waitFor(() => {
      expect(mock).toBeCalledWith({
        id: "6",
        name: "Wiaah",
        photo: "/place-2.jpg",
      });
    });
  });
});
