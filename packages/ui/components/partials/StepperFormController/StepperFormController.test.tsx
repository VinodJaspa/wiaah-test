import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { StepperFormController, StepperFormHandler } from "./index";
import { object, string, number, boolean } from "yup";
import { getTestId, setTestid, waitFor } from "utils";

const yupSchemas = {
  step1: object({
    name: string().required(),
    done: boolean().required(),
  }),
  step2: object({
    name: string().required(),
    done: boolean().required(),
    left: number().required(),
  }),
};

const testids = {
  nameInput: "nameInput",
  doneInput: "doneInput",
  leftInput: "leftInput",
  previousStepBtn: "previousStepBtn",
  step1: "step1",
  step2: "step2",
};

describe("StepperFormController tests", () => {
  let wrapper: ReactWrapper;
  let previousStepBtn: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <StepperFormController
        stepsNum={2}
        onFormComplete={(data) => console.log(data)}
      >
        {({ nextStep, previousStep, currentStepIdx }) => {
          return (
            <div data-currentstep={`${currentStepIdx}`}>
              <button
                {...setTestid(testids.previousStepBtn)}
                onClick={() => previousStep()}
              >
                previous
              </button>
              <StepperFormHandler
                handlerKey="1"
                validationSchema={yupSchemas.step1}
              >
                {({ validate }) => {
                  const [inputs, setInputs] =
                    React.useState<Partial<{ name: string; done: boolean }>>();
                  React.useEffect(() => {
                    if (inputs) {
                      validate(inputs);
                    }
                  }, [inputs]);
                  return (
                    <div
                      {...setTestid(testids.step1)}
                      className="flex flex-col gap-4"
                    >
                      <input
                        {...setTestid(testids.nameInput)}
                        name={"name"}
                        type="text"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            name: e.target.value,
                          }))
                        }
                      />
                      <input
                        {...setTestid(testids.doneInput)}
                        name={"done"}
                        type="checkbox"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            done: e.target.checked,
                          }))
                        }
                      />
                      <button
                        onClick={() => {
                          console.log("inputs", inputs);
                          nextStep();
                        }}
                      >
                        done
                      </button>
                    </div>
                  );
                }}
              </StepperFormHandler>
              <StepperFormHandler
                handlerKey="2"
                validationSchema={yupSchemas.step2}
              >
                {({ validate }) => {
                  const [inputs, setInputs] =
                    React.useState<
                      Partial<{ name: string; done: boolean; left: number }>
                    >();
                  React.useEffect(() => {
                    if (inputs) {
                      validate(inputs);
                    }
                  }, [inputs]);
                  return (
                    <div
                      {...setTestid(testids.step2)}
                      className="flex flex-col gap-4"
                    >
                      <input
                        name={"name"}
                        {...setTestid(testids.nameInput)}
                        type="text"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                      <input
                        name={"done"}
                        {...setTestid(testids.doneInput)}
                        type="checkbox"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            [e.target.name]: e.target.checked,
                          }))
                        }
                      />
                      <input
                        name={"left"}
                        {...setTestid(testids.leftInput)}
                        type="number"
                        onChange={(e) =>
                          setInputs((state) => ({
                            ...state,
                            [e.target.name]: e.target.checked,
                          }))
                        }
                      />
                      <button onClick={() => nextStep()}>done</button>
                    </div>
                  );
                }}
              </StepperFormHandler>
            </div>
          );
        }}
      </StepperFormController>,
    );
    previousStepBtn = wrapper.find(getTestId(testids.previousStepBtn));
  });

  it("should render the child steps properly", () => {
    expect(wrapper.find(getTestId(testids.step1)).length).toBe(1);
    expect(wrapper.find(getTestId(testids.step2)).length).toBe(1);
  });
  it("should have the current step being 0 initally", () => {
    expect(wrapper.find("[data-currentstep='0']").length).toBe(1);
  });

  it("should not change the current step on nextstep trigger if the input doesnt match the validation schema", () => {
    const step = wrapper.find(getTestId(testids.step1));
    const nextbtn = step.find("button");
    const nameInput = step.find(getTestId(testids.nameInput));
    const doneInput = step.find(getTestId(testids.doneInput));
    nameInput.simulate("change", { target: { checked: true } });
    doneInput.simulate("change", { target: { value: "test value" } });
    wrapper.update();
    nextbtn.simulate("click");
    wrapper.update();
    expect(wrapper.find("[data-currentstep='0']").length).toBe(1);
  });
  it("should change the current step on nextstep trigger if the input does match the validation schema", async () => {
    const step = wrapper.find(getTestId(testids.step1));
    const nextbtn = step.find("button");
    const nameInput = step.find(getTestId(testids.nameInput));
    const doneInput = step.find(getTestId(testids.doneInput));
    doneInput.simulate("change", { target: { checked: true } });
    nameInput.simulate("change", { target: { value: "test value" } });
    nextbtn.simulate("click");
    expect(wrapper.find("[data-currentstep='1']").length).toBe(1);
  });
  it("should not change the current step on previousStep trigger if the current step is the first step", () => {
    previousStepBtn.simulate("click");
    wrapper.update();
    expect(wrapper.find("[data-currentstep='0']").length).toBe(1);
  });
  it("should change the current step on previousStep trigger if the current step is not the first step", async () => {
    const step = wrapper.find(getTestId(testids.step1));
    const nextbtn = step.find("button");
    const nameInput = step.find(getTestId(testids.nameInput));
    const doneInput = step.find(getTestId(testids.doneInput));
    doneInput.simulate("change", { target: { checked: true } });
    nameInput.simulate("change", { target: { value: "test value" } });
    nextbtn.simulate("click");
    expect(wrapper.find("[data-currentstep='1']").length).toBe(1);
    previousStepBtn.simulate("click");
    expect(wrapper.find("[data-currentstep='0']").length).toBe(1);
  });
});
