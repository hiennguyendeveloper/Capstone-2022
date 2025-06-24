describe('Create a new section', function () {

  beforeEach(() => {

    cy.login()
    cy.visit('http://localhost:4200/');

  })

  it('Tests create a new section Success', function () {

    cy.get('.mat-icon:contains("menu")').click()
    cy.wait(400)
    cy.contains("Create a Section").click()
    cy.wait(200)
    cy.get('#newSection').click()
    cy.wait(200)
    cy.get('#newSection').type("cypress section test")
    cy.wait(200)
    cy.get('#newSection').should('have.value', 'cypress section test')
    cy.wait(200)
    cy.get('[type="submit"]').should('not.be.disabled')
    cy.wait(200)
    cy.intercept({method: 'POST', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get('[type="submit"]').click()
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("cypress section test").should('exist')
  });

  it('Tests create a new module Success', function () {
    cy.get('.mat-icon:contains("menu")').click()
    cy.wait(200)
    cy.get('.mat-list-item:contains("cypress section test")').click()
    cy.wait(200)
    cy.get('button:contains("Create Module")').click()
    cy.wait(200)
    cy.get('#newModule').click()
      .type("cypress test module")
      .should("have.value", 'cypress test module')
    cy.wait(200)
    cy.get('[type="submit"]').should('not.be.disabled')
    cy.wait(200)
    cy.intercept({method: 'POST', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get('[type="submit"]').click()
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("cypress test module").should('exist')

  })


  it('Test create a new lesson Success', function () {
    cy.get('.mat-icon:contains("menu")').click()
    cy.wait(200)
    cy.get('.mat-list-item:contains("cypress section test")').click()
    cy.wait(200)
    cy.get('button[id="cypress test module"]:contains("Start")').click()
    cy.wait(200)
    cy.get('button[id="mainCreate"]:contains("Create a Lesson")').click()
    cy.wait(200)
    cy.get('#newLesson').click()
      .type('cypress test lesson')
      .should('have.value', 'cypress test lesson')
    cy.wait(200)
    cy.get('[type="submit"]').should('not.be.disabled')
    cy.wait(200)
    cy.intercept({method: 'POST', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get('[type="submit"]').click()
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("cypress test lesson").should('exist')
    cy.get('mat-icon[id="cypress test lesson"]:contains("edit")').first().click()

  })

  afterEach(()=>{
    cy.testViewport()
  })


})
