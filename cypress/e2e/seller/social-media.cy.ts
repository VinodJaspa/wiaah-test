import jwtDecode from "jwt-decode";
import { getByTestid, sellerRoutes } from "../const";

const testids = {
  post: "social-newsfeed-post",
  likePostBtn: "social-post-like-btn",
  likedPostIcon: "social-post-liked-icon",
  unlikedPostIcon: "social-post-unliked-icon",
  sharePostBtn: "social-post-share-btn",
};

describe("social media e2e testing", () => {
  beforeEach(() => {
    // Wait for intercepted HTTP request
    cy.intercept("POST", "/graphql").as("graphql");
    // ...

    cy.task("resetDb");
    cy.task("seedDb");
    cy.task<string>("login", {
      type: "seller",
    }).then(async (v) => {
      cy.setCookie("jwt", v);
      cy.getCookies().should("not.be.empty");
      const decodedToken = await jwtDecode(v);
      if (typeof decodedToken["id"] === "string") {
        cy.task("seedSocialFollow", { from: decodedToken["id"] });
      } else throw new Error("no email attached to decoded token");
      return v;
    });
  });

  it("should display social posts on the newsfeed", () => {
    let slug: string;
    cy.visit(sellerRoutes.index);

    const posts = getByTestid(testids.post);
    cy.wait(5000);
    posts.should("have.length.at.least", 5);
    posts.first().click();
    cy.url().should("contain", `/post`);
    cy.url().then((url) => {
      slug = url.split("/post")[1];
      cy.url().should("contain", slug);
    });

    // like the post
    const likeBtn = getByTestid(testids.likePostBtn);

    likeBtn.click();

    const likedIcon = getByTestid(testids.likedPostIcon);

    likedIcon.should("have.length", 1);

    likeBtn.click();

    const unlikedIcon = getByTestid(testids.unlikedPostIcon);

    unlikedIcon.should("have.length", 1);
  });
});

// import { ServiceType } from "../../tasks";
// import {
//   getByTestid,
//   getTestId,
//   sellerRoutes,
//   sharedAccountsAppTestIds,
// } from "../const";

// const testids = {
//   myServicesSections: "section-/my-services",
//   myServiceSection: "section-/my-service",
//   addServiceBtn: "add-new-service-btn",
//   serviceStepper: "service-stepper",
//   serviceNameInput: "service-name-input",
//   serviceDescriptionInput: "service-description-input",
//   stepperNextBtn: "service-next-btn",
// };

// describe("services marketplace testing", () => {
//   // function loginAsService(serviceType?: ServiceType) {
//   //   cy.task("login", { serviceType }).then((cookie: string) =>
//   //     cy.setCookie("jwt", cookie)
//   //   );
//   // }
//   beforeEach(() => {
//     cy.task("seedDb");
//   });

//   // const stepperServiceTypeElementsTests: Record<
//   //   number,
//   //   Record<ServiceType, () => any>
//   // > = {
//   //   0: {
//   //     [ServiceType.Hotel]: () => {},
//   //     [ServiceType.HolidayRentals]: () => {},
//   //     [ServiceType.HealthCenter]: () => {},
//   //     [ServiceType.BeautyCenter]: () => {},
//   //     [ServiceType.Vehicle]: () => {},
//   //     [ServiceType.Restaurant]: () => {},
//   //   },
//   // };

//   {
//     // Object.values(ServiceType).map((serviceType) => {
//     it("should create services from the accounts app", () => {
//       const serviceType = ServiceType.Hotel;
//       // loginAsService(serviceType);

//       cy.viewport("macbook-16");

//       cy.visit(sellerRoutes.base);
//       getByTestid(sharedAccountsAppTestIds.headerProfileIcon)
//         .should("have.length", 1)
//         .as("profileIcon");

//       cy.get("@profileIcon").click();

//       getByTestid(sharedAccountsAppTestIds.headerSettings)
//         .should("have.length", 1)
//         .as("navbarSettings");

//       cy.get("@navbarSettings")
//         .find(getTestId(sharedAccountsAppTestIds.headerSettingsService))
//         .should("have.length", 1)
//         .click();

//       cy.url().should("contain", sellerRoutes.serviceManagement);

//       getByTestid(testids.myServicesSections).click();
//       getByTestid(testids.myServiceSection).click();
//       getByTestid(testids.addServiceBtn).click();
//       const serviceStepperName = "serviceStepper";

//       getByTestid(testids.serviceStepper).as(serviceStepperName);

//       const languages = ["en", "fr", "es", "de"];

//       const getStepper = () => cy.get(`@${serviceStepperName}`);

//       cy.get(`@${serviceStepperName}`).should("have.length", 1);

//       languages.forEach((code) => {
//         cy.get(getTestId(`lang-switch-${code}`))
//           .should("have.length", 1)
//           .click();

//         getStepper()
//           .get(getTestId(testids.serviceNameInput))
//           .should("have.length", 1)
//           .type("test " + code)
//           .should("have.value", "test " + code);

//         getStepper()
//           .get(getTestId(testids.serviceDescriptionInput))
//           .should("have.length", 1)
//           .type(`test ${code} desc`)
//           .should("have.value", `test ${code} desc`);
//       });

//       // step 1

//       // const step1 = stepperServiceTypeElementsTests[0][serviceType];

//       // step1();

//       // getByTestid(testids.stepperNextBtn).click();

//       // });
//     });
//   }
// });
