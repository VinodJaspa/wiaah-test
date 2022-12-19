import React from "react";
import { mount, ReactWrapper } from "enzyme";
import {
  BeautyCenterRecommendedSearchCard,
  BeautyCenterRecommendedSearchCardProps,
} from "./BeautyCenterRecommendedSearchCard";
import { ServicesRequestKeys } from "@UI";

let mockVisit: jest.Mock = jest.fn();
let mockVisitService: jest.Mock = jest.fn();
let mockVisitServiceOnMap: jest.Mock = jest.fn();
jest.mock("routing", () => ({
  useRouting: () => ({
    visit: mockVisit.mockImplementation((routes: (routes: any) => string) => {
      return routes({
        visitService: mockVisitService,
        visitServiceOnMap: mockVisitServiceOnMap,
      });
    }),
  }),
}));

describe("BeautyCenterRecommentedSearchCard tests", () => {
  let wrapper: ReactWrapper;
  let detailsBtn: ReactWrapper;
  let props: BeautyCenterRecommendedSearchCardProps;
  beforeEach(() => {
    props = {
      id: "123",
      name: "name",
      rate: 4,
      owners: ["test2", "test2"],
      reviews: 150,
      thumbnail: "test src",
    };
    mockVisit.mockClear();
    mockVisitService.mockClear();
    wrapper = mount(<BeautyCenterRecommendedSearchCard {...props} />);

    detailsBtn = wrapper.findWhere((node) => {
      return node.name() === "Button" && node.text() === "Details";
    });
  });

  it("should have details button", () => {
    expect(detailsBtn.length).toBe(1);
  });
  it("should have AspectRatioImage component with the right src and alt attributes", () => {
    expect(
      wrapper.findWhere((node) => {
        return (
          node.name() === "AspectRatioImage" &&
          node.props().src === "test src" &&
          node.props().alt === "name"
        );
      }).length
    ).toBe(1);
  });
  it("should trigger visitService routing function on details click", () => {
    detailsBtn.simulate("click");
    expect(mockVisit).toBeCalledTimes(1);
    expect(mockVisitService).toBeCalledTimes(1);
    expect(mockVisitService).toBeCalledWith(
      props,
      ServicesRequestKeys.beauty_center
    );
  });
  it("should trigger visit visitServiceOnmap routing function on show on map click ", () => {
    const showOnmapBtn = wrapper.findWhere(
      (node) => node.type() === "p" && node.text() === "Show on map"
    );
    showOnmapBtn.simulate("click");
    expect(mockVisit).toBeCalledTimes(1);
    expect(mockVisitServiceOnMap).toBeCalledTimes(1);
    expect(mockVisitServiceOnMap).toBeCalledWith(
      props,
      ServicesRequestKeys.beauty_center
    );
  });
  it("should have rate component with the right rating prop", () => {
    const rateComponent = wrapper.find("Rate");
    expect(rateComponent.length).toBe(1);
    expect(rateComponent.prop("rating")).toBe(4);
  });
  it("should have reviews text", () => {
    const nodes = wrapper.findWhere(
      (node) => node.type() !== "undefiend" && node.text() === `${150} review`
    );
    expect(nodes.length).toBeGreaterThan(0);
  });
  it("should have name text", () => {
    const nodes = wrapper.findWhere((node) => node.text() === props.name);
    expect(nodes.length).toBeGreaterThan(1);
  });
});
