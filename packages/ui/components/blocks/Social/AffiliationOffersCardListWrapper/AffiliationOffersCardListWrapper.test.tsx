import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { RecoilRoot } from "recoil";
import { AffiliationOffersCardListWrapper } from "@UI";
import { socialAffiliationCardPlaceholders } from "@UI/placeholder";

const selectors = {
  colsWrapper: "[data-testid='ColumnsWrapper']",
  card: "[data-testid='AffiliationCard']",
};

describe("AffiliationOffersCardListWrapper render tests", () => {
  let wrapper: ShallowWrapper;
  let colsWrapper: ShallowWrapper;
  let cards: ShallowWrapper;
  let cols: number;
  beforeEach(() => {
    cols = 3;
    wrapper = shallow(
      <AffiliationOffersCardListWrapper
        cols={cols}
        items={socialAffiliationCardPlaceholders}
      />
    );
    colsWrapper = wrapper.find(selectors.colsWrapper);
    cards = wrapper.find(selectors.card);
  });

  it("should render properly", () => {
    shallow(<AffiliationOffersCardListWrapper items={[]} />);
  });
  it("should have the right amount of columns", () => {
    const childs = colsWrapper.children();
    expect(childs.length).toBe(cols);
  });
  it("should have the right amounts of cards", () => {
    expect(cards.length).toBe(socialAffiliationCardPlaceholders.length);
  });
});

describe("AffiliationOffersCardListWrapper snapshot tests", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <RecoilRoot>
        <AffiliationOffersCardListWrapper items={[]} />
      </RecoilRoot>
    );
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should match snapshot with items", () => {
    wrapper = shallow(
      <RecoilRoot>
        <AffiliationOffersCardListWrapper
          items={socialAffiliationCardPlaceholders}
        />
      </RecoilRoot>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
