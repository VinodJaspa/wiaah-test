import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "ui/components/partials/Accordion";
import { getTestId, waitFor } from "utils/src/test-utils";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import React from "react";

const selectors = {
  accordionButton: "AccordionButton",
  accordionPanel: "AccordionPanel",
};

describe("Accordion not lazy functional tests", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Accordion>
        <AccordionItem itemkey={13}>
          <AccordionButton>
            <button data-testid={selectors.accordionButton}>button</button>
          </AccordionButton>
          <AccordionPanel>
            <span data-testid={selectors.accordionPanel}>test</span>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  });

  it("should render childs properly", () => {
    expect(wrapper.find(getTestId(selectors.accordionButton)).length).toBe(1);
    expect(wrapper.find(getTestId(selectors.accordionPanel)).length).toBe(1);
  });

  it("should not unmount panel child on open or close", () => {
    const btn = wrapper.find(getTestId(selectors.accordionButton));
    btn.simulate("click");
    wrapper.update();
    expect(wrapper.find(getTestId(selectors.accordionPanel)).length).toBe(1);
    btn.simulate("click");
    wrapper.update();
    expect(wrapper.find(getTestId(selectors.accordionPanel)).length).toBe(1);
  });
});

describe("Accordion lazy functional tests", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Accordion isLazy>
        <AccordionItem itemkey={13}>
          <AccordionButton>
            <button data-testid={selectors.accordionButton}>button</button>
          </AccordionButton>
          <AccordionPanel>
            <span data-testid={selectors.accordionPanel}>test</span>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  });

  it("should not render panel's childs initaly", () => {
    expect(wrapper.find(getTestId(selectors.accordionButton)).length).toBe(1);
    expect(wrapper.find(getTestId(selectors.accordionPanel)).length).toBe(0);
  });

  it("should mount and unMount panel's child on btn click", async () => {
    const btn = wrapper.find(getTestId(selectors.accordionButton));
    btn.simulate("click");
    wrapper.update();
    expect(wrapper.find(getTestId(selectors.accordionPanel)).length).toBe(1);

    btn.simulate("click");
    await waitFor(() => {
      wrapper.update();
      expect(wrapper.find(getTestId(selectors.accordionPanel)).length).toBe(0);
    });
  });
});

describe("Accordion snapshot tests", () => {
  it("should match snapshot", () => {
    expect(
      shallow(
        <Accordion>
          <AccordionItem itemkey={1}>
            <AccordionButton>
              <div>button</div>
            </AccordionButton>
            <AccordionPanel>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              laudantium quod perspiciatis facere officiis nisi similique
              placeat, cupiditate consectetur libero in quo dolor ducimus
              tempore deserunt, quas commodi? Deleniti, sint.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem itemkey={1}>
            <AccordionButton>
              <div>button</div>
            </AccordionButton>
            <AccordionPanel>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              laudantium quod perspiciatis facere officiis nisi similique
              placeat, cupiditate consectetur libero in quo dolor ducimus
              tempore deserunt, quas commodi? Deleniti, sint.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )
    );
  });
});
