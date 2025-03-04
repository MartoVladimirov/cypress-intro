describe('Registration tests', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:8080/')
  })

  it('enter submit without valid user name',() => {
    cy.get('[data-test-id="submit"]').click();

    cy.get('[data-test-id="fullname-error"]').should('be.visible');
  })


  it('full name error is cleared after valid input is added',() => {
    cy.get('[data-test-id="submit"]').click();
    cy.get('[data-test-id="fullname"').type("John Doe");
    cy.get('[data-test-id="submit"]').click();
    cy.get('[data-test-id="fullname-error"]').should('not.exist');
  })

  it('enter invalid email',() => {
    cy.get('[data-test-id="email"').type("invalid_email");
    cy.get('[data-test-id="submit"]').click();
    cy.get('[data-test-id="email-error"]').should('be.visible');
  })

  it('enter invalid password',() => {
    cy.get('[data-test-id="password"').type("short");
    cy.get('[data-test-id="submit"]').click();
    cy.get('[data-test-id="password-error"]').should('be.visible');
  })
  it('enter invalid date',() => {
    cy.get('[data-test-id="submit"]').click();
    cy.get('[data-test-id="date-error"]').should('be.visible');
  })
  it('enter invalid gender',() => {
    cy.get('[data-test-id="submit"]').click();
    cy.get('[data-test-id="gender-error"]').should('be.visible');
  })

  it('enter valid data and click submit',()=> {
    cy.get('[data-test-id="fullname"').type("John Doe");
    cy.get('[data-test-id="email"').type("john_does@email.com");
    cy.get('[data-test-id="password"').type("12345678");
    cy.get('[data-test-id="gender"').select("Male");
    cy.get('[data-test-id="date"').type("2000-01-01");
    cy.get('[data-test-id="submit"]').click();
    cy.url().should('eq', 'http://localhost:8080/thank-you?') 
  })
})