import {
  getByTestid,
  getTestId,
  sellerRoutes,
  sharedAccountsAppTestIds,
} from "../const";

export enum ServiceType {
  Hotel = "hotel",
  HolidayRentals = "holiday_rentals",
  Restaurant = "restaurant",
  HealthCenter = "health_center",
  BeautyCenter = "beauty_center",
  Vehicle = "vehicle",
}

const testids = {
  myServicesSections: "section-/my-services",
  myServiceSection: "section-/my-service",
  addServiceBtn: "add-new-service-btn",
  serviceStepper: "service-stepper",
  serviceNameInput: "service-name-input",
  serviceDescriptionInput: "service-description-input",
  stepperNextBtn: "service-next-btn",
};

describe("services marketplace testing", () => {
  function loginAsService(serviceType?: ServiceType) {
    cy.task("login", { serviceType }).then((cookie: string) =>
      cy.setCookie("jwt", cookie)
    );
  }
  beforeEach(() => {
    cy.task("seedDb");
  });

  const stepperServiceTypeElementsTests: Record<
    number,
    Record<ServiceType, () => any>
  > = {
    0: {
      [ServiceType.Hotel]: () => {},
      [ServiceType.HolidayRentals]: () => {},
      [ServiceType.HealthCenter]: () => {},
      [ServiceType.BeautyCenter]: () => {},
      [ServiceType.Vehicle]: () => {},
      [ServiceType.Restaurant]: () => {},
    },
  };

  {
    Object.values(ServiceType).map((serviceType) => {
      it("should create services from the accounts app", () => {
        // const serviceType = ServiceType.Hotel;
        loginAsService(serviceType);

        cy.viewport("macbook-16");

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

        cy.url().should("contain", sellerRoutes.serviceManagement);

        getByTestid(testids.myServicesSections).click();
        getByTestid(testids.myServiceSection).click();
        getByTestid(testids.addServiceBtn).click();
        const serviceStepperName = "serviceStepper";

        getByTestid(testids.serviceStepper).as(serviceStepperName);

        const languages = ["en", "fr", "es", "de"];

        const getStepper = () => cy.get(`@${serviceStepperName}`);

        cy.get(`@${serviceStepperName}`).should("have.length", 1);

        languages.forEach((code) => {
          cy.get(getTestId(`lang-switch-${code}`))
            .should("have.length", 1)
            .click();

          getStepper()
            .get(getTestId(testids.serviceNameInput))
            .should("have.length", 1)
            .type("test " + code)
            .should("have.value", "test " + code);

          getStepper()
            .get(getTestId(testids.serviceDescriptionInput))
            .should("have.length", 1)
            .type(`test ${code} desc`)
            .should("have.value", `test ${code} desc`);
        });

        Object.values(stepperServiceTypeElementsTests).map((step) => {
          const fn = step[serviceType];

          fn();
          getByTestid(testids.stepperNextBtn).click();
        });
      });
    });
  }
});
