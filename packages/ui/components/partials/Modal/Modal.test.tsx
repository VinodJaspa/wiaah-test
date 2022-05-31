import React from "react";
import {
  Modal,
  ModalContent,
  ModalButton,
  ModalExtendedWrapper,
  ModalCloseButton,
  ModalOverlay,
} from "./";
import { shallow, mount, ReactWrapper } from "enzyme";
import { getTestId, getMountedComponent, waitFor } from "utils";

const selectors = {
  modalOverlay: "ModalOverlay",
  modalContent: "ModalContent",
  modalCloseBtn: "ModalCloseBtn",
  modalOpenBtn: "ModalOpenBtn",
};

const Wrapper = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <ModalExtendedWrapper modalKey="14">
      <ModalButton>
        <button data-testid={selectors.modalOpenBtn} />
      </ModalButton>
      <Modal
        isLazy
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onOpen={() => {
          setIsOpen(true);
        }}
      >
        <ModalOverlay data-testid={selectors.modalOverlay} />
        <ModalContent>
          <div data-testid={selectors.modalContent}>
            <h1>Content</h1>
            <ModalCloseButton>
              <button data-testid={selectors.modalCloseBtn} />
            </ModalCloseButton>
          </div>
        </ModalContent>
      </Modal>
    </ModalExtendedWrapper>
  );
};

describe("Modal unLazy Functional tests", () => {
  let wrapper: ReactWrapper;
  let modalOverlay: ReactWrapper;
  let modalContent: ReactWrapper;
  let modalCloseBtn: ReactWrapper;
  let modalOpenBtn: ReactWrapper;
  let onCloseMock: jest.Mock;
  let onOpenMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    onOpenMock = jest.fn();
    wrapper = mount(
      <Modal isOpen={true} onClose={onCloseMock} onOpen={onOpenMock}>
        <ModalOverlay data-testid={selectors.modalOverlay} />
        <ModalContent>
          <div data-testid={selectors.modalContent}>
            <ModalCloseButton>
              <button data-testid={selectors.modalCloseBtn} />
            </ModalCloseButton>
            <h1>Content</h1>
          </div>
        </ModalContent>
      </Modal>
    );
    modalOverlay = getMountedComponent(
      wrapper,
      getTestId(selectors.modalOverlay)
    );
    modalContent = getMountedComponent(
      wrapper,
      getTestId(selectors.modalContent)
    );
    modalCloseBtn = getMountedComponent(
      wrapper,
      getTestId(selectors.modalCloseBtn)
    );
    modalOpenBtn = getMountedComponent(
      wrapper,
      getTestId(selectors.modalOpenBtn)
    );
  });

  it("should render content childs correctly", () => {
    console.log(wrapper.debug());
    expect(modalContent.length).toBe(1);
  });
  it("should trigger onClose on overlay click", () => {
    modalOverlay.simulate("click");
    expect(onCloseMock).toBeCalledTimes(1);
  });
  it("should call trigger onClose on close button click", () => {
    modalCloseBtn.simulate("click");
    expect(onCloseMock).toBeCalledTimes(1);
  });
});
describe("Extended Modal Functional tests", () => {
  let wrapper: ReactWrapper;
  let modalOverlay: ReactWrapper;
  let modalContent: ReactWrapper;
  let modalCloseBtn: ReactWrapper;
  let modalOpenBtn: ReactWrapper;
  let onCloseMock: jest.Mock;
  let onOpenMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    onOpenMock = jest.fn();
    wrapper = mount(
      <ModalExtendedWrapper modalKey="15">
        <ModalButton>
          <button data-testid={selectors.modalOpenBtn} />
        </ModalButton>
        <Modal isOpen={false} onClose={onCloseMock} onOpen={onOpenMock}>
          <ModalOverlay data-testid={selectors.modalOverlay} />
          <ModalContent data-testid={selectors.modalContent}>
            <ModalCloseButton>
              <button data-testid={selectors.modalCloseBtn} />
            </ModalCloseButton>
            <h1>Content</h1>
          </ModalContent>
        </Modal>
      </ModalExtendedWrapper>
    );
    modalOverlay = getMountedComponent(
      wrapper,
      getTestId(selectors.modalOverlay)
    );
    modalContent = getMountedComponent(
      wrapper,
      getTestId(selectors.modalContent)
    );
    modalCloseBtn = getMountedComponent(
      wrapper,
      getTestId(selectors.modalCloseBtn)
    );
    modalOpenBtn = getMountedComponent(
      wrapper,
      getTestId(selectors.modalOpenBtn)
    );
  });

  it("should trigger onOpen on modalButton click", () => {
    modalOpenBtn.simulate("click");
    expect(onOpenMock).toBeCalledTimes(1);
  });
});

describe("Modal Lazy Functional tests", () => {
  let wrapper: ReactWrapper;
  let modalOverlay: ReactWrapper;
  let modalContent: ReactWrapper;
  let modalCloseBtn: ReactWrapper;
  let modalOpenBtn: ReactWrapper;
  let onCloseMock: jest.Mock;
  let onOpenMock: jest.Mock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    onOpenMock = jest.fn();
    wrapper = mount(<Wrapper />);
    modalOverlay = getMountedComponent(
      wrapper,
      getTestId(selectors.modalOverlay)
    );
    modalContent = getMountedComponent(
      wrapper,
      getTestId(selectors.modalContent)
    );
    modalCloseBtn = getMountedComponent(
      wrapper,
      getTestId(selectors.modalCloseBtn)
    );
    modalOpenBtn = getMountedComponent(
      wrapper,
      getTestId(selectors.modalOpenBtn)
    );
  });

  it("should not render content initialy", () => {
    expect(modalContent.length).toBe(0);
  });
  it("should mount content on open", () => {
    modalOpenBtn.simulate("click");
    wrapper.update();
    expect(
      getMountedComponent(wrapper, getTestId(selectors.modalContent)).length
    ).toBe(1);
  });
  it("should unmount content on close", async () => {
    modalOpenBtn.simulate("click");
    wrapper.update();

    modalCloseBtn = getMountedComponent(
      wrapper,
      getTestId(selectors.modalCloseBtn)
    );
    modalCloseBtn.simulate("click");

    waitFor(() => {
      wrapper.update();
      expect(
        getMountedComponent(wrapper, getTestId(selectors.modalContent)).length
      ).toBe(0);
    });
  });
});

describe("Modal snapshot tests", () => {
  it("should match snapshot on closed state", () => {
    expect(
      shallow(
        <Modal isOpen={false} onClose={() => {}} onOpen={() => {}}>
          <ModalOverlay />
          <ModalContent>
            <h1>div</h1>
          </ModalContent>
        </Modal>
      )
    );
  });
  it("should match snapshot on open state", () => {
    expect(
      shallow(
        <Modal isOpen={true} onClose={() => {}} onOpen={() => {}}>
          <ModalOverlay />
          <ModalContent>
            <h1>div</h1>
          </ModalContent>
        </Modal>
      )
    );
  });
});
