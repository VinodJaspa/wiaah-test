import { mount } from "enzyme";
import React from "react";
import { getTestId } from "utils/src/test/test-utils";
import { UsersProfiles } from ".";

// testid selectors
// data-testid="selectorName"

const usersProfilesPlaceHolder = [
  {
    id: "1",
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    profession: "Hotel Manager",
  },
  {
    id: "2",
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    profession: "Bartender",
  },
  {
    id: "3",
    name: "Sam",
    userPhotoSrc: "/shop-2.jpeg",
    profession: "Musician",
  },
  {
    id: "4",
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    profession: "Market Vendor",
  },
  {
    id: "5",
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    profession: "Painter",
  },
  {
    id: "6",
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    profession: "Hotel Manager",
  },
  {
    id: "7",
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    profession: "Bartender",
  },
  {
    id: "8",
    name: "Sam",
    userPhotoSrc: "/shop-2.jpeg",
    profession: "Musician",
  },
  {
    id: "9",
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    profession: "Market Vendor",
  },
  {
    id: "10",
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    profession: "Painter",
  },
];

const selectors = {
  userProfile: "UserProfile",
  profilesContainer: "UsersProfilesContainer",
  userActivity: "UserActivity",
  userVerified: "UserVerified",
  userName: "UserName",
};

describe("UsersProfiles 'narrow' variant  tests", () => {
  let usersProfiles: any;
  let profilesContainer: any;

  beforeEach(() => {
    const wrapper = mount(
      <UsersProfiles
        variant="narrow"
        maxNarrowItems={5}
        users={usersProfilesPlaceHolder}
      />,
    );
    usersProfiles = wrapper.find(`[data-testid="${selectors.userProfile}"]`);
    profilesContainer = wrapper.find(
      `[data-testid="${selectors.profilesContainer}"]`,
    );
  });

  it("should have the right users profiles as provided in maxNarrowItems", () => {
    expect(usersProfiles.length).toBe(5);
  });

  it("should not have users names, activity, or verified indicator with 'narrow' variant", () => {
    usersProfiles.forEach((profile: any) => {
      expect(
        profile
          .find(`[data-testid="${getTestId(selectors.userName)}"]`)
          .exists(),
      ).toBe(false);
      expect(
        profile
          .find(`[data-testid="${getTestId(selectors.userActivity)}"]`)
          .exists(),
      ).toBe(false);
      expect(
        profile
          .find(`[data-testid="${getTestId(selectors.userVerified)}"]`)
          .exists(),
      ).toBe(false);
    });
  });
});
