import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { getTestId, setTestid } from "utils";
import { ServicesSearchGrid } from "./ServicesSearchGrid";

const selectors = {
  mockedChild: "child",
};

const MockChildComp: React.FC<{ id: number }> = ({ id }) => {
  return <div data-testid="child">child {id}</div>;
};

describe("ServiceSearchWrapper render tests", () => {
  let childsCount = 15;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ServicesSearchGrid
        component={MockChildComp}
        data={[...Array(childsCount)].map((_, i) => ({ id: i }))}
        handlePassData={(props) => props}
      />
    );
  });

  it("should have the right childs count", () => {
    console.log(wrapper.debug());
    expect(wrapper.children().length).toBe(childsCount);
  });

  it("should render the right child component", () => {
    const mockedChilds = wrapper.children(getTestId(selectors.mockedChild));
    expect(mockedChilds.length).toBe(childsCount);
  });
});
