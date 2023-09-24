import { ServiceType } from "../../tasks";
import {
  getByTestid,
  getTestId,
  marketplaceRoutes,
  sellerRoutes,
  sharedAccountsAppTestIds,
} from "../const";

const testids = {
  homepage_near_places: "homepage-near-places-container",
  service_card: "service-card",
};

describe("services marketplace testing", () => {
  beforeEach(() => {
    cy.task("seedDb");
  });
  it("should show suggested places near user on the home page", () => {
    cy.visit(marketplaceRoutes.base, {
      onBeforeLoad(win) {
        // e.g., force Barcelona geolocation
        const latitude = 41.38879;
        const longitude = 2.15899;
        cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
          (cb) => {
            return cb({ coords: { latitude, longitude } });
          }
        );
      },
    });

    getByTestid(testids.homepage_near_places)
      .should("have.length", 1)
      .as("near-places-container");

    cy.get("@near-places-container")
      .find(getTestId(testids.service_card))
      .should("have.length.at.least", 3);
  });

  it("should create services from the accounts app", () => {
    cy.visit(sellerRoutes.base);
    getByTestid(sharedAccountsAppTestIds.headerProfileIcon)
      .should("have.length", 1)
      .as("profileIcon");

    cy.get("@profileIcon").click();

    getByTestid(sharedAccountsAppTestIds.headerSettings)
      .should("have.length", 1)
      .as("navbarSettings");

    cy.get("@navbarSettings")
      .find(getTestId(sharedAccountsAppTestIds.headerSettingsService))
      .should("have.length", 1)
      .click();

    cy.url().should("have.text", sellerRoutes.serviceManagement);
  });
});
