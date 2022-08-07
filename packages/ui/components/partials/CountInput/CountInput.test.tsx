import { ReactWrapper, mount } from "enzyme";
import { getMountedComponent, getTestId, waitFor } from "utils/src/test";
import { CountInput } from "./CountInput";
import React from "react";

const testids = {
  incrementBtn: "IncrementCountBtn",
  decrementBtn: "DecrementCountBtn",
};

describe("CountInput no bounding tests", () => {
  let wrapper: ReactWrapper;
  let incrementBtn: ReactWrapper;
  let decrementBtn: ReactWrapper;
  let onChangeMock: jest.Mock;
  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = mount(<CountInput onCountChange={onChangeMock} />);
    incrementBtn = getMountedComponent(
      wrapper,
      getTestId(testids.incrementBtn)
    );
    decrementBtn = getMountedComponent(
      wrapper,
      getTestId(testids.decrementBtn)
    );
  });
  it("should render properly with count of 0 initialy", () => {
    expect(incrementBtn.length).toBe(1);
    expect(decrementBtn.length).toBe(1);
    expect(wrapper.text()).toBe("0");
  });
  it("should increment", () => {
    incrementBtn.simulate("click");
    wrapper.update();
    expect(wrapper.text()).toBe("1");
  });
  it("should decrement", () => {
    decrementBtn.simulate("click");
    wrapper.update();
    expect(wrapper.text()).toBe("-1");
  });
  it("should trigger onChange initialy", () => {
    expect(onChangeMock).toBeCalledTimes(1);
    expect(onChangeMock).toBeCalledWith(0);
  });
  it("should trigger onChange on increment", () => {
    incrementBtn.simulate("click");
    wrapper.update();
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith(1);
  });
  it("should trigger onChange on decrement", () => {
    decrementBtn.simulate("click");
    wrapper.update();
    expect(onChangeMock).toBeCalledTimes(2);
    expect(onChangeMock).toBeCalledWith(-1);
  });
});

describe("CountInput with bounding tests", () => {
  let wrapper: ReactWrapper;
  let incrementBtn: ReactWrapper;
  let decrementBtn: ReactWrapper;
  let onChangeMock: jest.Mock;
  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = mount(
      <CountInput min={0} max={4} onCountChange={onChangeMock} />
    );
    incrementBtn = getMountedComponent(
      wrapper,
      getTestId(testids.incrementBtn)
    );
    decrementBtn = getMountedComponent(
      wrapper,
      getTestId(testids.decrementBtn)
    );
  });

  it("should increment up to the max boundery", () => {
    [...Array(10)].forEach(() => {
      incrementBtn.simulate("click");
    });
    wrapper.update();
    expect(wrapper.text()).toBe("4");
  });
  it("should decrement down to the min boundery", () => {
    [...Array(10)].forEach(() => {
      decrementBtn.simulate("click");
    });
    wrapper.update();
    expect(wrapper.text()).toBe("0");
  });
});

const ControlledWrappedCount = () => {
  const [state, setState] = React.useState<number>(0);
  React.useEffect(() => {
    setTimeout(() => {
      setState(15);
    }, 1000);
  });
  return (
    <div>
      <CountInput count={state} onCountChange={setState} />
    </div>
  );
};

describe("CountInput controlled tests", () => {
  let wrapper: ReactWrapper;
  let incrementBtn: ReactWrapper;
  let decrementBtn: ReactWrapper;
  let onChangeMock: jest.Mock;
  beforeEach(() => {
    onChangeMock = jest.fn();
    wrapper = mount(<ControlledWrappedCount />);
    incrementBtn = getMountedComponent(
      wrapper,
      getTestId(testids.incrementBtn)
    );
    decrementBtn = getMountedComponent(
      wrapper,
      getTestId(testids.decrementBtn)
    );
  });

  it("should increment up to the max boundery", () => {
    [...Array(10)].forEach(() => {
      incrementBtn.simulate("click");
    });
    wrapper.update();
    expect(wrapper.text()).toBe("10");
  });
  it("should decrement down to the min boundery", () => {
    [...Array(10)].forEach(() => {
      decrementBtn.simulate("click");
    });
    wrapper.update();
    expect(wrapper.text()).toBe("-10");
  });
  it("should update count based on the passed count property", async () => {
    await waitFor(() => {
      wrapper.update();
      expect(wrapper.text()).toBe("15");
    });
  });
});
