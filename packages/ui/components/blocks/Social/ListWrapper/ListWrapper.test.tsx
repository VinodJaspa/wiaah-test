import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { ListWrapper } from "ui";

const selectors = {
  listContainer: "[data-testid='ListWrapperListContainer']",
  item: "[data-testid='ListWrapperItem']",
};

let cols = 3;

describe("ListWrapper component render tests", () => {
  let wrapper: ShallowWrapper;
  let items: ShallowWrapper;
  let listContainers: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ListWrapper cols={cols}>
        {[...Array(20)].map((_, i) => (
          <div key={i}>{i}</div>
        ))}
      </ListWrapper>
    );
    items = wrapper.find(selectors.item);
    listContainers = wrapper.find(selectors.listContainer);
  });
  it("should have the right number of containers", () => {
    expect(listContainers.length).toBe(cols);
  });
  it("should have the right number of elements", () => {
    expect(items.length).toBe(20);
  });
});

describe("ListWrapper component snapshot tests", () => {
  let wrapperWithItems: ShallowWrapper;
  let wrapperWithoutItems: ShallowWrapper;
  beforeEach(() => {
    wrapperWithItems = shallow(
      <ListWrapper cols={cols}>
        {[...Array(20)].map((_, i) => (
          <div key={i}>{i}</div>
        ))}
      </ListWrapper>
    );
    wrapperWithoutItems = shallow(<ListWrapper />);
  });
  it("should match snapshot with items", () => {
    expect(wrapperWithItems).toMatchSnapshot();
  });
  it("should match snapshot without items", () => {
    expect(wrapperWithoutItems).toMatchSnapshot();
  });
});
