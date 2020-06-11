// https://docs.cypress.io/api/introduction/api.html

describe("Cube layout", () => {
  it("contains Fork me on GitHub image", () => {
    cy.visit("/");
    cy.get('[alt="Fork me on GitHub"]').should("be.visible");
  });

  it("contains a cube-container class", () => {
    cy.visit("/");
    cy.get(".container")
      .find(".cube-container")
      .should("exist");
  });

  it("contains a cube class", () => {
    cy.visit("/");
    cy.get(".container")
      .find(".cube")
      .should("exist");
  });

  it("has all sides", () => {
    cy.visit("/");
    cy.get(".container")
      .find(".side .front")
      .should("exist");
    cy.get(".container")
      .find(".side .top")
      .should("exist");
    cy.get(".container")
      .find(".side .bottom")
      .should("exist");
    cy.get(".container")
      .find(".side .left")
      .should("exist");
    cy.get(".container")
      .find(".side .right")
      .should("exist");
    cy.get(".container")
      .find(".side .back")
      .should("exist");
  });

  it("has exactly 54 cells", () => {
    cy.visit("/");
    cy.get(".container")
      .find(".cell")
      .should("have.length", 54);
  });
});
