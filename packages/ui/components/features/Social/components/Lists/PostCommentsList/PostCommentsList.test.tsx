import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { PostCommentsList, PostCommentsListProps } from "./PostCommentsList";

let mockGetPostCommentsFetcher: jest.Mock;

jest.mock("api", () => {
  mockGetPostCommentsFetcher = jest.fn();
  return {
    getPostCommentsFetcher: mockGetPostCommentsFetcher,
  };
});

describe("PostCommentsList tests", () => {
  let wrapper: ReactWrapper;
  let props: PostCommentsListProps;
  beforeEach(() => {
    props = {
      postId: "135",
    };
    wrapper = mount(<PostCommentsList {...props} />, {
      wrappingComponent: (props) => (
        <QueryClientProvider {...props} client={new QueryClient()} />
      ),
    });
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should be calling the getPostCommentsFetcher api function with the right props", () => {
    expect(mockGetPostCommentsFetcher).toBeCalledWith(
      { id: props.postId },
      { page: 1, take: 10 }
    );
  });
});
