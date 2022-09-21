import { shallow, ShallowWrapper } from "enzyme";
import { StatusProps, StatusEnum, Status } from "./index";

describe("Status", () => {
  let wrapper: ShallowWrapper;
  let status: StatusEnum[] = ["completed", "failed", "pending"];

  beforeEach(() => {
    wrapper = shallow(<Status status="completed" />);
  });
  it("Should match snapshot for each status variant", () => {
    status.forEach((s) => {
      expect(shallow(<Status status={s} />)).toMatchSnapshot(`varaint ${s}`);
    });
  });
});
