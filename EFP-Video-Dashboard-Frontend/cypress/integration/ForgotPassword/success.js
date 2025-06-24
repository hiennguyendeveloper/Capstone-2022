describe('User Forgot password test', function (){

  beforeEach(()=>{
    cy.visit('http://localhost:4200');
    cy.wait(200)
    cy.get('.mat-menu-trigger').click();
    cy.get('.mat-menu-content > .mat-focus-indicator > span').contains('Login')
    cy.get('.mat-menu-content > .mat-focus-indicator').click();
    cy.get('button:contains("FORGOT PASSWORD")').click();
  })

  it('Render component', function () {


    cy.get('#email').click();
    cy.wait(200)
    cy.get('#email').type("chrisl10@escapefrompoverty.org")
      .should("have.value","chrisl10@escapefrompoverty.org");

    cy.get('button:contains("Submit")').click();
    }
  )







  after(()=>{
    cy.testViewport()
  })
});
