import React from "react";
import { shallow } from "enzyme";
import { ToggleVisable, Button, ToggleVisableItem } from "ui";

describe("Tabs render test", () => {
  it("should render correctly", () => {
    expect(
      shallow(
        <ToggleVisable>
          {({ changeState, state }) => (
            <div className="flex flex-col gap-4">
              <div>
                <Button onClick={() => changeState("state 1")}>state 1</Button>
                <Button onClick={() => changeState("state 2")}>state 2</Button>
              </div>

              <ToggleVisableItem visableOnState={"state 1"}>
                <div className="p-4 bg-primary">this is state 1</div>
              </ToggleVisableItem>
              <ToggleVisableItem visableOnState={"state 2"}>
                <div className="p-4 bg-primary">this is state 2</div>
              </ToggleVisableItem>
            </div>
          )}
        </ToggleVisable>
      )
    );
  });
});

describe("Tabs snapshot tests", () => {
  it("it should match snapshot", () => {
    expect(
      shallow(
        <ToggleVisable>
          {({ changeState, state }) => (
            <div className="flex flex-col gap-4">
              <div>
                <Button onClick={() => changeState("state 1")}>state 1</Button>
                <Button onClick={() => changeState("state 2")}>state 2</Button>
              </div>

              <ToggleVisableItem visableOnState={"state 1"}>
                <div className="p-4 bg-primary">this is state 1</div>
              </ToggleVisableItem>
              <ToggleVisableItem visableOnState={"state 2"}>
                <div className="p-4 bg-primary">this is state 2</div>
              </ToggleVisableItem>
            </div>
          )}
        </ToggleVisable>
      )
    );
  });
});
