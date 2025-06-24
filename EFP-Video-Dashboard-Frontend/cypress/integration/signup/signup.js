describe('Navigate to signup page', function () {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('.mat-menu-trigger').click();
    cy.get('.mat-menu-content > .mat-focus-indicator').click();
    cy.get('[type="signup"]').click();
  })


  it('Test Signup Submit', function () {
    cy.get("#email").click()
      .wait(200)
      .type("chris10@lanphever.com")
      .wait(200)
      .should('have.value',"chris10@lanphever.com")

    cy.get("#first_name").click()
      .wait(200)
      .type("chris")
      .wait(200)
      .should('have.value',"chris")

    cy.get("#last_name").click()
      .wait(200)
      .type("lanphier")
      .wait(200)
      .should('have.value',"lanphier")

    cy.get("#password").click()
      .wait(200)
      .type("!QAZ1qaz!QAZ1qaz")
      .wait(200)
      .should('have.value',"!QAZ1qaz!QAZ1qaz")

    cy.intercept({url:'**', method:'**'}).as("stopSubmit")

    cy.get('button:contains("SIGNUP")').click()

    cy.wait("@stopSubmit")

  })



  it('Test Close dialog to login', function () {

    cy.url().should('include', '/');
    cy.get("button:contains(Login, instead)").click()
  })


  afterEach(()=>{
    cy.testViewport()
  })


})

