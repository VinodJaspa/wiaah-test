import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { getTestId, waitFor } from "utils";
import {
  DoctorInputData,
  HealthCenterAddDoctorForm,
  HealthCenterAddDoctorFormProps,
} from "./HealthCenterAddDoctorForm";

const mockUploadImage: jest.Mock = jest.fn();
const mockCancelUpload: jest.Mock = jest.fn();
const mockUploadVideo: jest.Mock = jest.fn();

jest.mock("ui", () => ({
  ...jest.requireActual("ui"),
  useFileUploadModal: () => {
    return {
      uploadType: null,
      setUploadType: () => {},
      cancelUpload: mockCancelUpload,
      uploadImage: mockUploadImage,
      uploadVideo: mockUploadVideo,
    };
  },
}));

const selectors = {
  addNewDocBtn: "AddNewDoctorButton",
  doctorNameInput: "DoctorNameInput",
  doctorSpecialistSelectInput: "DoctorSpecialistSelectInput",
  doctorPhotoBtn: "DoctorPhotoButton",
  doctorAddBtn: "DoctorAddBtn",
  photoUploadModal: "PhotoUploadModal",
};

describe("HealthCenterAddDoctorForm", () => {
  let wrapper: ShallowWrapper;
  let mockOnAdd: jest.Mock;
  let _wrapper: ShallowWrapper;
  const props: HealthCenterAddDoctorFormProps = {
    onAdd(data) {},
  };

  beforeEach(() => {
    mockOnAdd = jest.fn();
    wrapper = shallow(
      <HealthCenterAddDoctorForm {...props} onAdd={mockOnAdd} />
    );
  });

  function switchWrapper() {
    _wrapper = wrapper;
    wrapper = wrapper.dive();
  }

  it("should render initial with no form or input just add new doctor button", () => {
    expect(wrapper.find(getTestId(selectors.doctorAddBtn)).length).toBe(0);
    expect(wrapper.find(getTestId(selectors.doctorNameInput)).length).toBe(0);
    expect(
      wrapper.find(getTestId(selectors.doctorSpecialistSelectInput)).length
    ).toBe(0);
    expect(wrapper.find(getTestId(selectors.doctorPhotoBtn)).length).toBe(0);
    expect(wrapper.find(getTestId(selectors.photoUploadModal)).length).toBe(0);
    expect(wrapper.find(getTestId(selectors.addNewDocBtn)).length).toBe(1);
  });
  it("should render the form and remove the add new doctor button when the user clicks on add new doctor button", () => {
    wrapper.find(getTestId(selectors.addNewDocBtn)).simulate("click");
    wrapper.update();
    switchWrapper();
    expect(wrapper.find(getTestId(selectors.doctorAddBtn)).length).toBe(1);
    expect(wrapper.find(getTestId(selectors.doctorNameInput)).length).toBe(1);
    expect(
      wrapper.find(getTestId(selectors.doctorSpecialistSelectInput)).length
    ).toBe(1);
    expect(wrapper.find(getTestId(selectors.doctorPhotoBtn)).length).toBe(1);
    expect(wrapper.find(getTestId(selectors.photoUploadModal)).length).toBe(1);
    expect(wrapper.find(getTestId(selectors.addNewDocBtn)).length).toBe(0);
  });

  it("should trigger onAdd with the right props", async () => {
    wrapper.find(getTestId(selectors.addNewDocBtn)).simulate("click");
    wrapper.update();
    switchWrapper();
    wrapper
      .find(getTestId(selectors.doctorNameInput))
      .simulate("change", { target: { value: "test doc name" } });
    const onSpecialistSelect = wrapper
      .find(getTestId(selectors.doctorSpecialistSelectInput))
      .prop("onOptionSelect") as Function;
    onSpecialistSelect("test specialist");
    const onImageUpload = wrapper
      .find(getTestId(selectors.photoUploadModal))
      .prop("onImgUpload") as Function;
    onImageUpload({ desc: "image blob" });

    wrapper.update();
    _wrapper.update();
    console.log(wrapper.debug());
    console.log(_wrapper.debug());
    wrapper.find(getTestId(selectors.doctorAddBtn)).simulate("click");
    wrapper.update();
    await waitFor(() => {
      wrapper.update();

      expect(mockOnAdd).toBeCalledTimes(1);
      expect(mockOnAdd).toBeCalledWith({
        name: "test doc name",
        specialist: "test specialist",
        photo: { desc: "images blob" },
      });
    });
  });
});
