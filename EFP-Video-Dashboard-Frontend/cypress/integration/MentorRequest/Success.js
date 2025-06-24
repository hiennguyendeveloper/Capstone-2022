describe('User Forgot password test', function () {

  beforeEach(()=>{
    cy.login()
  })

  it('Render component', function () {

    cy.visit('http://localhost:4200/mentorRequest');
    cy.wait(200);


  })

  it('Submit mentor request', function () {

    cy.visit('http://localhost:4200/mentorRequest');
    cy.wait(200);
    cy.get("input[id='name']").click();
    cy.get("input[id='name']").type("Chris");
    cy.get('.mat-select-arrow').click();
    cy.get('#mat-option-0 > .mat-option-text').click();
    cy.get('.request-form > .mat-form-field-hide-placeholder > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("TESTING DELETE ME");
    cy.get("button:contains('Submit Request')").click();
    cy.url().should('equal','http://localhost:4200/')


  })



  afterEach(()=>{
    cy.testViewport()
  })
})
