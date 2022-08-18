import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { ReactPubSubEventKeys as mockReactPubsubEventKeys } from "react-pubsub";
import { getTestId } from "utils";
import {
  SocialServicePostAttachment,
  SocialServicePostAttachmentsProps,
} from "./SocialServicePostAttachments";

const testids = {
  openServiceDetailsModalBtn: "openServiceDetailsModalBtn",
};

let mockUseReactPubsub: jest.Mock = jest.fn();
let mockReactPubsubEmit: jest.Mock = jest.fn();

jest.mock("react-pubsub", () => ({
  ...jest.requireActual("react-pubsub"),
  useReactPubsub: (
    fn: (keys: Partial<typeof mockReactPubsubEventKeys>) => string
  ) => {
    mockUseReactPubsub(fn({ serviceModal: "openServiceModal" }));
    return {
      emit: (props: any) => mockReactPubsubEmit(props),
    };
  },
}));

describe("SocialServicePostAttachment tests", () => {
  let wrapper: ShallowWrapper;
  let props: SocialServicePostAttachmentsProps;

  beforeEach(() => {
    props = {
      id: "123",
      alt: "service name",
      src: "/shop-2.jpeg",
      type: "image",
    };
    wrapper = shallow(<SocialServicePostAttachment {...props} />);
  });
  it("should match snapshot with required props", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with optional props", () => {
    wrapper = shallow(
      <SocialServicePostAttachment
        {...props}
        attachmentProps={{ blur: true }}
        innerProps={{ onClick: () => {} }}
        onInteraction={() => {}}
        cashback={{
          amount: 15,
          type: "percent",
        }}
        discount={15}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should emit ReactPubsub openServiceModal event with the right id on calender icon click", () => {
    expect(mockUseReactPubsub).toBeCalledWith(
      mockReactPubsubEventKeys.serviceModal
    );
    const openServiceModal = wrapper.find(
      getTestId(testids.openServiceDetailsModalBtn)
    );
    openServiceModal.simulate("click");
    expect(mockReactPubsubEmit).toBeCalledWith({ id: props.id });
  });
});
