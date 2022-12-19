import React from "react";
import { render, getTestId } from "@UI/utils/test-utils";
import { UsersProfiles } from ".";

// testid selectors
// data-testid="selectorName"
const selectors = {
  userProfile: "UserProfile",
  profilesContainer: "UsersProfilesContainer",
  userActivity: "UserActivity",
  userVerified: "UserVerified",
  userName: "UserName",
};

const usersProfilesPlaceHolder = [
  {
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    activityType: "Hotel",
    verified: true,
  },
  {
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    activityType: "Bar",
    verified: false,
  },
  {
    name: "sam",
    userPhotoSrc: "/shop-2.jpeg",
    activityType: "Singer",
    verified: true,
  },
  {
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    activityType: "MarketPlace",
    verified: true,
  },
  {
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    activityType: "Artist",
    verified: false,
  },
  {
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    activityType: "Hotel",
    verified: true,
  },
  {
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    activityType: "Bar",
    verified: false,
  },
  {
    name: "sam",
    userPhotoSrc: "/shop-2.jpeg",
    activityType: "Singer",
    verified: true,
  },
  {
    name: "Wiaah",
    userPhotoSrc: "/shop-3.jpeg",
    activityType: "MarketPlace",
    verified: true,
  },
  {
    name: "Jack",
    userPhotoSrc: "/shop.jpeg",
    activityType: "Artist",
    verified: false,
  },
];

describe("UsersProfiles 'narrow' variant  tests", () => {
  let usersProfiles: HTMLElement[];
  let profilesContainer: HTMLElement;

  beforeEach(() => {
    const wrapper = render(
      <UsersProfiles
        variant="narrow"
        maxNarrowItems={5}
        users={usersProfilesPlaceHolder}
      />
    );
    usersProfiles = wrapper.queryAllByTestId(selectors.userProfile);
    profilesContainer = wrapper.getByTestId(selectors.profilesContainer);
  });
  it("should have the right users profiles as provided in maxNarrowItems", () => {
    expect(usersProfiles.length).toBe(5);
  });

  it("should not have users names,activity, or verified indicator with 'narrow' variant", () => {
    usersProfiles.forEach((profile, i) => {
      expect(profile.querySelector(getTestId(selectors.userName))).toBe(null);
      expect(profile.querySelector(getTestId(selectors.userActivity))).toBe(
        null
      );
      expect(profile.querySelector(getTestId(selectors.userVerified))).toBe(
        null
      );
    });
  });
});

describe("UsersProfiles 'long' variant  tests", () => {
  let usersProfiles: HTMLElement[];
  let profilesContainer: HTMLElement;

  beforeEach(() => {
    const wrapper = render(
      <UsersProfiles
        variant="long"
        maxLongItems={7}
        users={usersProfilesPlaceHolder}
      />
    );
    usersProfiles = wrapper.queryAllByTestId(selectors.userProfile);
    profilesContainer = wrapper.getByTestId(selectors.profilesContainer);
  });
  it("should have the right users profiles as provided in maxLongItems", () => {
    expect(usersProfiles.length).toBe(7);
  });
  it("should have users names,activityType and weather users are verified or not with the 'long' variant", () => {
    console.log(profilesContainer.innerHTML);
    usersProfiles.forEach((profile, i) => {
      const userPlaceholder = usersProfilesPlaceHolder[i];
      expect(
        profile.querySelector(getTestId(selectors.userName))?.textContent
      ).toBe(userPlaceholder.name);
      expect(
        profile.querySelector(getTestId(selectors.userActivity))?.textContent
      ).toBe(userPlaceholder.activityType);
      if (userPlaceholder.verified) {
        expect(
          profile.querySelector(getTestId(selectors.userVerified))
        ).not.toBeNull();
      } else {
        expect(
          profile.querySelector(getTestId(selectors.userVerified))
        ).toBeNull();
      }
    });
  });
});

describe("UsersProfiles snapshot tests", () => {
  it("should match snapshot", () => {
    render(<UsersProfiles users={usersProfilesPlaceHolder} />);
  });
});
