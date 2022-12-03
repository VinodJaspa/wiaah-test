import { getTestId } from "utils";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import {
  Stepper,
  StepperContent,
  StepperNextButton,
  StepperPreviousButton,
} from "ui/components/partials/Stepper";
import React from "react";

const selectors = {
  stepperContent: "StepperContent",
  stepperNextBtn: "StepperNextBtn",
  StepperPreviousBtn: "StepperPreviousBtn",
};

describe("Stepper functional tests", () => {
  let wrapper: ReactWrapper;
  let stepperContent: ReactWrapper;
  let stepperNextButton: ReactWrapper;
  let stepperPreviousButton: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Stepper>
        <StepperContent data-testid={selectors.stepperContent}>
          <div>step 1</div>
          <div>step 2</div>
          <div>step 3</div>
        </StepperContent>
        <StepperNextButton>
          <span data-testid={selectors.stepperNextBtn}>next</span>
        </StepperNextButton>
        <StepperPreviousButton>
          <span data-testid={selectors.StepperPreviousBtn}>previous</span>
        </StepperPreviousButton>
      </Stepper>
    );
    stepperContent = wrapper.find(getTestId(selectors.stepperContent));
    stepperNextButton = wrapper.find(getTestId(selectors.stepperNextBtn));
    stepperPreviousButton = wrapper.find(
      getTestId(selectors.StepperPreviousBtn)
    );
  });
  it("Should start initial with the first step", () => {
    expect(stepperContent.length).toBe(1);
    expect(stepperContent.children().length).toBe(1);
    expect(stepperContent.childAt(0).text()).toContain("step 1");
  });
  it("Should go to next step on nextStepButtonClick", () => {
    expect(stepperContent.children().length).toBe(1);
    expect(stepperContent.childAt(0).text()).toContain("step 1");
    stepperNextButton.simulate("click");
    wrapper.update();
    expect(stepperContent.childAt(0).text()).toContain("step 2");
  });
  it("Should go to previous step on prevuiosStepButtonClick", () => {
    expect(stepperContent.children().length).toBe(1);
    expect(stepperContent.childAt(0).text()).toContain("step 1");
    stepperNextButton.simulate("click");
    wrapper.update();
    expect(stepperContent.childAt(0).text()).toContain("step 2");
    stepperPreviousButton.simulate("click");
    wrapper.update();
    expect(stepperContent.childAt(0).text()).toContain("step 1");
  });
});

describe("Stepper Snapshot tests", () => {
  it("should match snapshot", () => {
    expect(
      shallow(
        <Stepper>
          <StepperContent data-testid={selectors.stepperContent}>
            <div>step 1</div>
            <div>step 2</div>
            <div>step 3</div>
          </StepperContent>
          <StepperNextButton>
            <span data-testid={selectors.stepperNextBtn}>next</span>
          </StepperNextButton>
          <StepperPreviousButton>
            <span data-testid={selectors.StepperPreviousBtn}>previous</span>
          </StepperPreviousButton>
        </Stepper>
      )
    ).toMatchSnapshot();
  });
});
