import { ServicePresentationType } from "@UI/../api";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { useReactPubsubModal as mockReactPubsubEventKeys } from "react-pubsub";
import { getTestId } from "utils";
import {
  SocialServicePostAttachment,
  SocialServicePostAttachmentsProps,
} from "./SocialServicePostAttachments";

const testids = {
  openServiceDetailsModalBtn: "openServiceDetailsModalBtn",
};

const mockUseReactPubsub: jest.Mock = jest.fn();
const mockReactPubsubEmit: jest.Mock = jest.fn();

jest.mock("react-pubsub", () => ({
  ...jest.requireActual("react-pubsub"),
  useReactPubsub: (
    fn: (keys: Partial<typeof mockReactPubsubEventKeys>) => string,
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
      id: "sample-id",
      attachment: {
        __typename: "ServicePresentation",
        type: ServicePresentationType.Img, // Assuming this corresponds to the ServicePresentationType
        src: "https://example.com/sample-image.jpg",
      },
      alt: "Sample alt text",
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
        innerProps={{ onClick: () => { } }}
        onInteraction={() => { }}
        cashback={{
          amount: 15,
          type: "percent",
        }}
        discount={15}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("should emit ReactPubsub openServiceModal event with the right id on calender icon click", () => {
    expect(mockUseReactPubsub).toBeCalledWith(mockReactPubsubEventKeys);
    const openServiceModal = wrapper.find(
      getTestId(testids.openServiceDetailsModalBtn),
    );
    openServiceModal.simulate("click");
    expect(mockReactPubsubEmit).toBeCalledWith({ id: props.id });
  });
});
