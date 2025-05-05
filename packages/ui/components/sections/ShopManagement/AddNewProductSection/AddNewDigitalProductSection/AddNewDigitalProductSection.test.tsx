import { shallow, ShallowWrapper } from "enzyme";
import { AddNewDigitalProductSection } from "./AddNewDigitalProductSection";

const mockUploadImage = jest.fn();
const mockUploadVideo = jest.fn();

const mockUseMediaUploadControls = jest.fn().mockImplementation(() => ({
  uploadImage: mockUploadImage,
  uploadVideo: mockUploadVideo,
  controls: {},
}));
jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useMediaUploadControls: () => mockUseMediaUploadControls,
}));

describe("Add New digital product section", () => {
  let wrapper: ShallowWrapper;
  let mockOnChange: jest.Mock;
  beforeEach(() => {
    mockOnChange = jest.fn();
    wrapper = shallow(<AddNewDigitalProductSection onChange={mockOnChange} />);
  });

  it("should trigger trigger upload image if the file type selecte is image", () => {});
});
