import { QueryPaginationInputs } from "api";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { SocialServicePostsList } from "./SocialServicesList";

let mockuseGetServicesPostsQuery: jest.Mock;
let mockuseRouting: jest.Mock;
let mockVisitRouting: jest.Mock;
let mockAddQueryVisitRouting: jest.Mock;
jest.mock("routing", () => {
  mockuseRouting = jest.fn();
  mockVisitRouting = jest.fn();
  mockAddQueryVisitRouting = jest.fn();
  return {
    useRouting: mockuseRouting.mockImplementation(() => ({
      visit: mockVisitRouting.mockImplementation(
        (fn: (props: any) => string) => {
          fn({
            route: "",
            query: {},
            addQuery: mockAddQueryVisitRouting,
          });
        }
      ),
    })),
  };
});

jest.mock("ui", () => {
  mockuseGetServicesPostsQuery = jest.fn();
  return {
    ...jest.requireActual("ui"),
    useGetServicesPostsQuery: mockuseGetServicesPostsQuery.mockImplementation(
      (pagination: QueryPaginationInputs) => ({
        isLoading: false,
        isError: false,
        data: {
          hasMore: false,
          total: 156,
          data: [...Array(10)].map((_, i) => ({
            id: `${i}`,
            createdAt: new Date(2022, 8, 15).toString(),
            label: "restaurant",
            name: "service name" + i,
            thumbnail: "/place-1.jpg",
            type: "restaurant",
            hashtags: ["fashion", "gaming", "shopping"],
            content: "some random post content",
            user: {
              accountType: "seller",
              id: "132",
              name: "seller name",
              public: true,
              thumbnail: "/shop-2.jpeg",
              verified: true,
            },
            postInteraction: {
              comments: 50,
              likes: 300,
            },
          })),
        },
      })
    ),
  };
});

describe("SocialServicesList tests", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<SocialServicePostsList />);
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should call useGetServicesPostsQuery with the right pagination", () => {
    expect(mockuseGetServicesPostsQuery).toBeCalledWith({ page: 1, take: 16 });
  });
  it("should have a service component and triggering the onServiceClick prop should visit the current route with the service id query", () => {
    expect(mockuseRouting).toBeCalled();
    const services = wrapper.findWhere(
      (node) => typeof node.prop("onServiceClick") === "function"
    );
    expect(services.length).toBe(10);
    services.at(0).prop("onServiceClick")(0);
    expect(mockVisitRouting).toBeCalled();
    expect(mockAddQueryVisitRouting).toBeCalledWith({ servicepostid: 0 });
  });
});
