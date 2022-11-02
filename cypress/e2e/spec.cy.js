describe("can view URL", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
  });
});

describe("language menu renders", () => {
  it("passes", () => {
    cy.get(".hVcvig > .Body__StyledBody-sc-7b90e315-0").contains("Language:");
    cy.get('[alt="Spanish Flag. Click to change language to Spanish."]');
    cy.get('[alt="US Flag. Click to change language to English."]');
  });
});

describe("title and subheading renders", () => {
  it("passes", () => {
    cy.get(".Header__StyledHeader-sc-9b0bcb7f-0");
    cy.get(".Subheader__StyledSubheader-sc-fe59e48e-0");
  });
});

describe("search filter renders list properly", () => {
  it("passes", () => {
    cy.get(".Input__StyledInput-sc-cbcd5df2-0").type("wh");
    cy.get(".crLwAt").contains("Hole in the Wall Where the Men Can See it All");
    cy.get(
      ":nth-child(6) > .eNnhPn > .Flex__StyledFlex-sc-2c2c0568-0 > .Body__StyledBody-sc-7b90e315-0"
    ).contains("Man Painted Silver Who Makes Robot Noises");
    cy.get(
      ":nth-child(7) > .eNnhPn > .Flex__StyledFlex-sc-2c2c0568-0 > .Body__StyledBody-sc-7b90e315-0"
    ).contains("When Wolf");
  });
});

describe("status filter renders list properly", () => {
  it("passes", () => {
    cy.get(".Input__StyledInput-sc-cbcd5df2-0").clear();
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").select("Alive");
    cy.get(
      ":nth-child(11) > .eNnhPn > .SearchListItem__StyledStatus-sc-59267838-1"
    ).contains("Alive");
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").select("Dead");
    cy.get(
      ":nth-child(11) > .eNnhPn > .SearchListItem__StyledStatus-sc-59267838-1"
    ).contains("Dead");
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").select("Unknown");
    cy.get(
      ":nth-child(11) > .eNnhPn > .SearchListItem__StyledStatus-sc-59267838-1"
    ).contains("Unknown");
    cy.get(".eNnhPn").should("have.length", 20);
  });
});

describe("Show more characters button appends to current shown character list", () => {
  it("passes", () => {
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").select("All");
    cy.get(".Button__StyledButton-sc-33e5c78e-0").click();
    cy.get(".eNnhPn").should("have.length", 40);
  });
});

describe("when scrollPosition > 0, the scroll to top button should appear", () => {
  it("passes", () => {
    cy.scrollTo(0, 1);
    cy.get(".ScrollToTopButton__StyledScrollToTopButton-sc-c378d651-0");
  });
});

describe("scroll to top button should disappear when scrollPosition = 0", () => {
  it("passes", () => {
    cy.scrollTo(0, 1000);
    cy.get(".ScrollToTopButton__StyledScrollToTopButton-sc-c378d651-0").click();
    cy.get(".ScrollToTopButton__StyledScrollToTopButton-sc-c378d651-0").should(
      "not.exist"
    );
  });
});

describe("if no results, should have indicator and no rendered list item", () => {
  it("passes", () => {
    cy.get(".Input__StyledInput-sc-cbcd5df2-0").type("zzz");
    cy.get(".eNnhPn").should("not.exist");
    cy.get(".crLwAt > .Body__StyledBody-sc-7b90e315-0");
  });
});

describe("translation from spanish to english works", () => {
  it("passes", () => {
    cy.get(".Input__StyledInput-sc-cbcd5df2-0").clear();
    cy.get(
      '[alt="Spanish Flag. Click to change language to Spanish."]'
    ).click();
    cy.get(".Subheader__StyledSubheader-sc-fe59e48e-0").contains(
      "Herramienta de Busqueda de Personajes"
    );
    cy.get(".Input__StyledInput-sc-cbcd5df2-0")
      .invoke("attr", "placeholder")
      .should("contain", "Buscar personajes...");
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").contains("Todos");
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").contains("Viva");
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").contains("Muerta");
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").contains("Desconocida");
    cy.get(
      ":nth-child(5) > .eNnhPn > .SearchListItem__StyledStatus-sc-59267838-1"
    ).contains("Viva");
    cy.get(
      ":nth-child(11) > .eNnhPn > .SearchListItem__StyledStatus-sc-59267838-1"
    ).contains("Desconocida");
    cy.get(
      ":nth-child(12) > .eNnhPn > .SearchListItem__StyledStatus-sc-59267838-1"
    ).contains("Muerta");
    cy.get(".hVcvig > .Body__StyledBody-sc-7b90e315-0").contains("Idioma:");
    cy.get(".Button__StyledButton-sc-33e5c78e-0").contains(
      "Cargar más personajes..."
    );
    cy.scrollTo(0, 1000);
    cy.get(
      ".ScrollToTopButton__StyledScrollToTopButton-sc-c378d651-0"
    ).contains("Vuelve al comienzo");
  });
});

describe("translation from english to spanish works", () => {
  it("passes", () => {
    cy.get('[alt="US Flag. Click to change language to English."]').click();
    cy.get(".Subheader__StyledSubheader-sc-fe59e48e-0").contains(
      "Character Search Tool"
    );
    cy.get(".Input__StyledInput-sc-cbcd5df2-0")
      .invoke("attr", "placeholder")
      .should("contain", "Search for characters...");
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").contains("All");
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").contains("Alive");
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").contains("Dead");
    cy.get(".Select__StyledSelect-sc-ca0c8cbd-0").contains("Unknown");
    cy.get(
      ":nth-child(5) > .eNnhPn > .SearchListItem__StyledStatus-sc-59267838-1"
    ).contains("Alive");
    cy.get(
      ":nth-child(11) > .eNnhPn > .SearchListItem__StyledStatus-sc-59267838-1"
    ).contains("Unknown");
    cy.get(
      ":nth-child(12) > .eNnhPn > .SearchListItem__StyledStatus-sc-59267838-1"
    ).contains("Dead");
    cy.get(".hVcvig > .Body__StyledBody-sc-7b90e315-0").contains("Language:");
    cy.get(".Button__StyledButton-sc-33e5c78e-0").contains(
      "Load more characters..."
    );
    cy.scrollTo(0, 1000);
    cy.get(
      ".ScrollToTopButton__StyledScrollToTopButton-sc-c378d651-0"
    ).contains("Scroll to top");
  });
});
