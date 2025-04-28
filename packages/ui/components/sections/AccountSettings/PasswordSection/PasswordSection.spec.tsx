import { shallow, ShallowWrapper } from "enzyme";
import { PasswordSection } from "./index";
import { getTestId, useChangePasswordMutation } from "@UI";

jest.mock("@UI", () => ({
  ...jest.requireActual("@UI"),
  useChangePasswordMutation: jest.fn(),
}));

const testids = {
  currentPassword: "current_password",
  newPass: "new_password",
  confirmPass: "confirm_password",
  forgotPass: "forgot_password",
  changePass: "change_password",
};

describe("passwordSection tests", () => {
  let wrapper: ShallowWrapper;

  const mockHook = useChangePasswordMutation as jest.Mock;

  beforeAll(() => {
    wrapper = shallow(<PasswordSection />);
  });

  it("should call the useChangePassword", async () => {
    const mockMutate = jest.fn();
    mockHook.mockImplementation(() => ({ mutate: mockMutate }));

    expect(mockHook).toBeCalledTimes(1);

    wrapper.find(getTestId(testids.currentPassword));
    console.log(wrapper.debug());
  });
});
