describe('Login page fail', function () {
  it('Tests login page fail', function () {
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
      .type("!QAZ1qaz!QAZ1qa")
      .should('have.value', '!QAZ1qaz!QAZ1qa');
    cy.wait(100);
    cy.get('[type="submit"]').should('not.be.disabled')
    cy.wait(200)
    cy.log(Cypress.env('api_url'));
    cy.wait(200)
    cy.intercept({method: 'POST', url: Cypress.env('api_url')+'/user/login'}).as('validateFormData');
    cy.wait(200)
    cy.get('[type="submit"]').click();
    cy.wait(200)
    cy.wait('@validateFormData')
      .its('request.url').should('include', '/user/login');
    // login error msg
    cy.wait(200)
    cy.url()
      .should('include', '/testimonials')
    cy.wait(200)
    cy.get('.mat-snack-bar-container').should("be.visible");

  });


  afterEach(()=>{
    cy.testViewport()
  })

});

