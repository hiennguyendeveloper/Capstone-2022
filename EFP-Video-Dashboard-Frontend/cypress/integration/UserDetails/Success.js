describe('User Detail Test', function () {

  beforeEach(()=>{
    cy.login()
    cy.visit('http://localhost:4200/');

  })

/*  it('Render component', function () {

    cy.get("#first_name").type("a")
      .should("contain",'a')
    cy.get("button:contains('Update')").click()
    cy.get('#first_name').should("contain",'a')


  })*/

  it('TEST Delete User Dialog -- CLOSE', function (){
    cy.get("mat-icon[id='chrislanphier']").click()
    cy.wait(200);
    cy.get("button:contains('Delete User')").click();
    cy.get("mat-icon:contains('close')").click();

  })

  it('TEST Delete User Dialog -- NO', function (){
    cy.get("mat-icon[id='chrislanphier']").click()
    cy.wait(200);
    cy.get("button:contains('Delete User')").click();
    cy.get("button:contains('No')").click();
  })

  it('TEST Delete User Dialog -- Yes', function (){
    cy.get("mat-icon[id='chrislanphier']").click()
    cy.wait(200);
    cy.get("button:contains('Delete User')").click();
    cy.intercept({method: 'GET', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get("button:contains('Yes')").click();
    cy.wait('@validateFormData')
  })

  it('Tests undo a section Success', function () {
    cy.visit("http://localhost:4200/settings")
    cy.wait(200)
    cy.contains("chris lanphier").should('exist')
    cy.wait(200)
    cy.intercept({method: 'GET', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get('mat-icon[id="chrislanphier"]:contains("undo")').click({ multiple: true })
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("chris lanphier").should('not.exist')

  })

  it('Tests delete a user', function () {
    cy.get("mat-icon[id='chrislanphier']").click()
    cy.wait(200);
    cy.get("button:contains('Delete User')").click();
    cy.intercept({method: 'GET', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get("button:contains('Yes')").click();
    cy.wait('@validateFormData')
    cy.visit("http://localhost:4200/settings")
    cy.wait(200)
    cy.contains("chris lanphier").should('exist')
    cy.wait(200)
    cy.intercept({method: 'GET', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get('mat-icon[id="chrislanphier"]:contains("delete")').click()
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("chris lanphier").should('not.exist')
  })

  afterEach(()=>{
    cy.testViewport()
  })
})
