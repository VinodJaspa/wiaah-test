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
