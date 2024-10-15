import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { CommentsViewer } from "@UI";
import { PostCardPlaceHolder } from "placeholder";
import { getMountedComponent } from "@UI/components/helpers/test/getMountedComponent";
import { RecoilRoot } from "recoil";
import { AttachmentType } from "@features/API/gql/generated";
import { PostCommentCardProps } from "@UI";
import { ContentHostType } from "@features/API";
const selectors = {
  commentsWrapper: "[data-testid='CommentsWrapper']",
  comment: "[data-testid='CommentCard']",
  showMoreBtn: "[data-testid='ShowMoreBtn']",
  showLessBtn: "[data-testid='ShowLessBtn']",
};

const commentsMock: PostCommentCardProps["comment"][] = [
  {
    __typename: "Comment",
    id: "1", // or generate a unique ID if needed
    content: "This is a sample comment.",
    commentedAt: new Date().toISOString(),
    likes: 10,
    userId: "user-1",
    hostId: "host-1",
    updatedAt: new Date().toISOString(),
    hostType: ContentHostType.Story,
    replies: 5, // an array for replies, can be populated later
    attachment: {
      __typename: "Attachment",
      src: "https://example.com/attachment.jpg",
      type: AttachmentType.Img, // could be 'video', 'audio', etc.
    },
    author: {
      __typename: "Profile",
      username: "sampleUser",
      photo: "https://example.com/profile.jpg",
      verified: true,
      id: "profile-1",
    },
  },
];

describe("CommentsViewer render tests", () => {
  let wrapper: ShallowWrapper;
  let commentsWrapper: ShallowWrapper;
  let comments: ShallowWrapper;
  let showMoreBtn: ShallowWrapper;
  let showLessBtn: ShallowWrapper;
  let maxInitialComments: number;
  beforeEach(() => {
    maxInitialComments = 4;
    wrapper = shallow(
      <CommentsViewer
        comments={commentsMock}
        maxInitailComments={maxInitialComments}
      />,
    );
    commentsWrapper = wrapper.find(selectors.commentsWrapper);
    comments = wrapper.find(selectors.comment);
    showMoreBtn = wrapper.find(selectors.showMoreBtn);
    showLessBtn = wrapper.find(selectors.showLessBtn);
  });

  it("should render properly", () => {
    shallow(
      <CommentsViewer
        comments={commentsMock}
        maxInitailComments={maxInitialComments}
      />,
    );
  });
  it("should have the same amount of comments as the maxInitialComments prop", () => {
    expect(comments.length).toBe(maxInitialComments);
  });
  it("should have 'show more' btn if the comments is more than the maxinitialcomments prop", () => {
    expect(commentsMock.length).toBeGreaterThan(maxInitialComments);
    expect(showMoreBtn.length).toBe(1);
  });
  it("should not have 'show more' btn if the comments is less than the maxinitialcomments prop", () => {
    wrapper = shallow(
      <CommentsViewer
        comments={commentsMock.slice(0, maxInitialComments - 1)}
        maxInitailComments={maxInitialComments}
      />,
    );

    showMoreBtn = wrapper.find(selectors.showMoreBtn);
    expect(showMoreBtn.length).toBe(0);
  });
});

describe("CommentsViewer functionality", () => {
  let wrapper: ReactWrapper;
  let commentsWrapper: ReactWrapper;
  let comments: ReactWrapper;
  let showMoreBtn: ReactWrapper;
  let showLessBtn: ReactWrapper;
  let maxInitialComments: number;
  beforeEach(() => {
    maxInitialComments = 4;
    wrapper = mount(
      <RecoilRoot>
        <CommentsViewer
          comments={commentsMock}
          maxInitailComments={maxInitialComments}
        />
      </RecoilRoot>,
    );
    commentsWrapper = getMountedComponent(
      wrapper,
      selectors.commentsWrapper,
      3,
    );
    comments = commentsWrapper.children();
    showMoreBtn = getMountedComponent(wrapper, selectors.showMoreBtn, 3);
    showLessBtn = getMountedComponent(wrapper, selectors.showLessBtn, 3);
  });
  it("should alternate between show more and show less", () => {
    expect(comments.length).toBe(maxInitialComments);
    expect(commentsMock.length).toBeGreaterThan(maxInitialComments);
    expect(showMoreBtn.length).toBe(1);
    expect(showLessBtn.length).toBe(0);

    showMoreBtn.simulate("click");
    wrapper.update();
    comments = getMountedComponent(
      wrapper,
      selectors.commentsWrapper,
    ).children();
    expect(comments.length).toBe(commentsMock.length);

    showMoreBtn = getMountedComponent(wrapper, selectors.showMoreBtn);
    showLessBtn = getMountedComponent(wrapper, selectors.showLessBtn);

    expect(showMoreBtn.length).toBe(0);
    expect(showLessBtn.length).toBe(1);

    showLessBtn.simulate("click");

    wrapper.update();
    comments = getMountedComponent(
      wrapper,
      selectors.commentsWrapper,
    ).children();

    expect(comments.length).toBe(maxInitialComments);

    showMoreBtn = getMountedComponent(wrapper, selectors.showMoreBtn);
    showLessBtn = getMountedComponent(wrapper, selectors.showLessBtn);

    expect(showMoreBtn.length).toBe(1);
    expect(showLessBtn.length).toBe(0);
  });
});

describe("CommentsViewer Snapshot Tests", () => {
  it("should match snapshot with no comments", () => {
    const wrapper = shallow(
      <CommentsViewer maxInitailComments={4} comments={[]} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with comments", () => {
    const wrapper = shallow(
      <CommentsViewer maxInitailComments={4} comments={commentsMock} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with comments after clicking on show more", () => {
    const wrapper = mount(
      <RecoilRoot>
        <CommentsViewer maxInitailComments={4} comments={commentsMock} />
      </RecoilRoot>,
    );
    expect(commentsMock.length).toBeGreaterThan(4);
    let comments = getMountedComponent(
      wrapper,
      selectors.commentsWrapper,
      3,
    ).children();
    const showMore = getMountedComponent(wrapper, selectors.showMoreBtn, 3);
    expect(comments.length).toBe(4);
    showMore.simulate("click");
    wrapper.update();

    comments = getMountedComponent(
      wrapper,
      selectors.commentsWrapper,
      3,
    ).children();

    expect(comments.length).toBe(commentsMock.length);
    expect(wrapper).toMatchSnapshot();
  });
});
