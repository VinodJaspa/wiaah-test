import { uesAdminGetStaffAccountsQuery } from "ui";
import { shallow, ShallowWrapper } from "enzyme";
import StaffView from "./index";
import { AccountStatus, AccountType } from "@features/API";

jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  uesAdminGetStaffAccountsQuery: jest.fn(),
}));

const testids = {

}

describe("staff-list view tests", () => {
  let wrapper: ShallowWrapper;

  let mockUseHook = uesAdminGetStaffAccountsQuery as jest.Mock;

  let mockdata: ReturnType<typeof uesAdminGetStaffAccountsQuery>["data"] = [
    {
      email: "test email 1",
      firstName: "first 1",
      id: "1",
      lastActiveAt: new Date().toString(),
      lastName: "last 1",
      status: AccountStatus.Active,
      type: AccountType.Admin,
      photo: "test photo", 
    },
  ];
  beforeEach(() => {
    mockUseHook.mockReturnValue({
      data: mockdata,
    });

    wrapper = shallow(<StaffView />);
  });

  it("should display data",()=> {
    
  })
});
