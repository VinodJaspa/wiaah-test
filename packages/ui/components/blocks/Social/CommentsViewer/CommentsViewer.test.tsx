import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { CommentsViewer } from "@UI";
import { PostCardPlaceHolder } from "placeholder";
import { getMountedComponent } from "@UI/components/helpers/test/getMountedComponent";
import { RecoilRoot } from "recoil";
const selectors = {
  commentsWrapper: "[data-testid='CommentsWrapper']",
  comment: "[data-testid='CommentCard']",
  showMoreBtn: "[data-testid='ShowMoreBtn']",
  showLessBtn: "[data-testid='ShowLessBtn']",
};

const commentsMock = PostCardPlaceHolder.postInfo.comments || [];

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
      />
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
      />
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
      />
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
      </RecoilRoot>
    );
    commentsWrapper = getMountedComponent(
      wrapper,
      selectors.commentsWrapper,
      3
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
      selectors.commentsWrapper
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
      selectors.commentsWrapper
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
      <CommentsViewer maxInitailComments={4} comments={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with comments", () => {
    const wrapper = shallow(
      <CommentsViewer maxInitailComments={4} comments={commentsMock} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with comments after clicking on show more", () => {
    const wrapper = mount(
      <RecoilRoot>
        <CommentsViewer maxInitailComments={4} comments={commentsMock} />
      </RecoilRoot>
    );
    expect(commentsMock.length).toBeGreaterThan(4);
    let comments = getMountedComponent(
      wrapper,
      selectors.commentsWrapper,
      3
    ).children();
    const showMore = getMountedComponent(wrapper, selectors.showMoreBtn, 3);
    expect(comments.length).toBe(4);
    showMore.simulate("click");
    wrapper.update();

    comments = getMountedComponent(
      wrapper,
      selectors.commentsWrapper,
      3
    ).children();

    expect(comments.length).toBe(commentsMock.length);
    expect(wrapper).toMatchSnapshot();
  });
});
