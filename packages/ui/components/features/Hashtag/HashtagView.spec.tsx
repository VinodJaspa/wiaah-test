import { shallow, ShallowWrapper } from "enzyme";
import { HashTagView } from "./HashTagView";
import { useGetTopHashtagPostsQuery, useGetTopHashtagServicePost } from "ui";
import { GetHashtagTopServicePostsInput } from "@features/API";

jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useGetTopHashtagPostsQuery: jest.fn(),
  useGetTopHashtagServicePost: jest.fn(),
}));

describe("should display top posts", () => {
  let wrapper: ShallowWrapper;

  let mockUseGetTopHashtagPostsQuery = useGetTopHashtagPostsQuery as jest.Mock;
  let mockUseGetTopHashtagServicePostsQuery =
    useGetTopHashtagServicePost as jest.Mock;

  beforeAll(() => {
    wrapper = shallow(<HashTagView tag="test tag" />);
  });

  it("should display hashtagPostsListWrapper with the right data", () => {
    expect(mockUseGetTopHashtagServicePostsQuery).toBeCalledWith({
      tag: "test tag1",
    } as GetHashtagTopServicePostsInput);
    mockUseGetTopHashtagPostsQuery.mockReturnValue({
      data: [{ test: "test1" }],
    });
  });
});
