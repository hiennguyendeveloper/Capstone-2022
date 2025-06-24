describe('Login to navigate user detail page', function () {
  it('Tests Login to navigate user detail page Success', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200');
    cy.wait(200)
    cy.get('.mat-menu-trigger').click();
    cy.get('.mat-menu-content > .mat-focus-indicator > span').contains('Login')
    cy.get('.mat-menu-content > .mat-focus-indicator').click();
    cy.get('#mat-input-1').click();
    cy.wait(100);
    cy.get('#mat-input-1')
      .type("chrisl10@escapefrompoverty.org")
      .should('have.value', 'chrisl10@escapefrompoverty.org');
    cy.wait(100)
    cy.get('#mat-input-2').click();
    cy.wait(100)
    cy.get('#mat-input-2')
      .type("!QAZ1qaz!QAZ1qaz")
      .should('have.value', '!QAZ1qaz!QAZ1qaz');
    cy.wait(100);
    cy.get('[type="submit"]').should('not.be.disabled')
    cy.wait(200)
    cy.log(Cypress.env('api_url'));
    cy.wait(200)
    cy.log(Cypress.env('api_url'))
    cy.intercept({method: 'POST', url: Cypress.env('api_url')+'/user/login'}).as('validateFormData');
    cy.wait(200)
    cy.get('[type="submit"]').click();
    cy.wait(200)
    cy.wait('@validateFormData')
      .its('request.url').should('include', '/user/login');

    cy.url().should('include','/');
// - query element
  });




  afterEach(()=>{
    cy.testViewport()
  })

  });

