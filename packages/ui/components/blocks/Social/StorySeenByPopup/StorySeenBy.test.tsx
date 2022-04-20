import React from "react";
import { mount, ReactWrapper, shallow } from "enzyme";
import { StorySeenByPopup } from "./";
import { RecoilRoot } from "recoil";
import { StorySeenByUserInfo } from "types/market/Social";
import { useStorySeenBy } from "ui";
import { getMountedComponent } from "../../../helpers";

const selectors = {
  usersListContainer: "[data-testid='UsersListContainer']",
  searchUserInput: "[data-testid='SearchUserInput']",
  closeModalBtn: "[data-testid='CloseModalBtn']",
  userName: "[data-testid='Username']",
  userCard: "[data-testid='UserCard']",
};

const users: StorySeenByUserInfo[] = [
  {
    name: "test",
    photoSrc: "/shop.jpeg",
  },
  {
    name: "test 1",
    photoSrc: "/shop-2.jpeg",
  },
  {
    name: "test 2",
    photoSrc: "/shop.jpeg",
  },
];

const WrapperComponent: React.FC = ({ children }) => {
  const { setStorySeenBy, OpenStorySeenBy } = useStorySeenBy();

  React.useEffect(() => {
    OpenStorySeenBy();
    setStorySeenBy(users);
  }, []);

  return <>{children}</>;
};

describe("StorySeenBy component render tests", () => {
  let storyId: string;

  let wrapper: ReactWrapper;
  let searchUserInput: ReactWrapper;
  let usersListContainer: ReactWrapper;
  let closeModalBtn: ReactWrapper;
  let userCard: ReactWrapper;

  beforeEach(() => {
    storyId = "123";

    wrapper = mount(
      <RecoilRoot>
        <WrapperComponent>
          <StorySeenByPopup storyId={storyId} />
        </WrapperComponent>
      </RecoilRoot>
    );
    usersListContainer = getMountedComponent(
      wrapper,
      selectors.usersListContainer
    );
    searchUserInput = getMountedComponent(wrapper, selectors.searchUserInput);
    closeModalBtn = wrapper.find(selectors.closeModalBtn);
    userCard = wrapper.find(selectors.userCard);
  });

  it("should have the right user cards as recieved from recoil state", () => {
    expect(usersListContainer.children().length).toBe(users.length);
  });
  it("should filter users as user types in search input", () => {
    searchUserInput.simulate("change", { target: { value: users[0].name } });
    wrapper.update();
    usersListContainer = getMountedComponent(
      wrapper,
      selectors.usersListContainer,
      3
    );

    usersListContainer.children().map((userCard) => {
      const name = getMountedComponent(userCard, selectors.userName, 5);

      expect(name.text()).toContain(users[0].name);
    });
  });
});

// describe("StorySeenBy component snapshot tests", () => {
//   it("should match snapshot", () => {
//     expect(
//       mount(
//         <RecoilRoot>
//           <WrapperComponent>
//             <StorySeenByPopup storyId={"123"} />
//           </WrapperComponent>
//         </RecoilRoot>
//       )
//     ).toMatchSnapshot();
//   });
// });
