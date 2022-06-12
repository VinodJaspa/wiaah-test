import React from "react";
import { shallow } from "enzyme";
import { Tabs, TabsHeader, TabList, TabItem, TabTitle } from "ui";

describe("Tabs render test", () => {
  it("should render correctly", () => {
    expect(
      shallow(
        <Tabs>
          <TabsHeader>
            <TabTitle>title 1</TabTitle>
            <TabTitle>title 2</TabTitle>
            <TabTitle>title 3</TabTitle>
            <TabTitle>title 4</TabTitle>
          </TabsHeader>
          <TabList>
            <TabItem>tab 1</TabItem>
            <TabItem>tab 2</TabItem>
            <TabItem>tab 3</TabItem>
            <TabItem>tab 4</TabItem>
          </TabList>
        </Tabs>
      )
    );
  });
});

describe("Tabs snapshot tests", () => {
  it("it should match snapshot", () => {
    expect(
      shallow(
        <Tabs>
          <TabsHeader>
            <TabTitle>title 1</TabTitle>
            <TabTitle>title 2</TabTitle>
            <TabTitle>title 3</TabTitle>
            <TabTitle>title 4</TabTitle>
          </TabsHeader>
          <TabList>
            <TabItem>tab 1</TabItem>
            <TabItem>tab 2</TabItem>
            <TabItem>tab 3</TabItem>
            <TabItem>tab 4</TabItem>
          </TabList>
        </Tabs>
      )
    );
  });
});
