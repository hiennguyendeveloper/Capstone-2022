describe('Undo a new section', function () {

  beforeEach(() => {

    cy.login()
    cy.visit('http://localhost:4200/');

  })

  it('Tests delete a lesson', function () {
    cy.get('.mat-icon:contains("menu")').click()
    cy.wait(200)
    cy.get('.mat-list-item:contains("cypress section test")').click()
    cy.wait(200)
    cy.get('button[id="cypress test module"]').click()
    cy.wait(200)
    cy.get('mat-icon[id="cypress test lesson"]:contains("edit")').first().click()
    cy.wait(200)
    cy.get('button:contains("Delete Lesson")').click({force: true})
    cy.wait(200)
    cy.intercept({method: 'GET', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get('button:contains("Yes")').click()
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("cypress test lesson").should('not.exist')
  })

  it('Tests delete a module', function () {
    cy.get('.mat-icon:contains("menu")').click()
    cy.wait(200)
    cy.get('.mat-list-item:contains("cypress section test")').click()
    cy.wait(200)
    cy.get('mat-icon[id="cypress test module"]:contains("edit")').first().click()
    cy.wait(200)
    cy.get('button:contains("Delete Module")').click()
    cy.wait(200)
    cy.intercept({method: 'GET', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get('button:contains("Yes")').click()
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("cypress test module").should('not.exist')
  })

  it('Tests delete a section', function () {
    cy.get('.mat-icon:contains("menu")').click()
    cy.wait(200)
    cy.get('.mat-list-item:contains("cypress section test")').click()
    cy.wait(200)
    cy.get('button:contains("Edit Section")').click()
    cy.wait(200)
    cy.get('button:contains("Delete Section")').click()
    cy.wait(200)
    cy.intercept({method: 'GET', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get('button:contains("Yes")').click()
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("cypress section test").should('not.exist')
  })


  it('Tests undo a section Success', function () {
    cy.visit("http://localhost:4200/settings")
    cy.wait(2000)
    cy.contains("cypress section test").should('exist')
    cy.wait(200)
    cy.intercept({method: 'GET', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.wait(200)
    cy.get('mat-icon[id="cypress section test"]:contains("undo")').click()
    cy.wait(200)
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("cypress section test").should('not.be.visible')

  })

  it('Tests undo a Module', function () {
    cy.visit("http://localhost:4200/settings")
    cy.contains("cypress test module").should('exist')
    cy.wait(200)
    cy.intercept({method: 'GET', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get('mat-icon[id="cypress test module"]:contains("undo")').click({ multiple: true })
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("cypress test module").should('not.exist')


  })

  it('Tests undo a lesson', function () {
    cy.visit("http://localhost:4200/settings")
    cy.wait(200)
    cy.contains("cypress test lesson").should('exist')
    cy.wait(200)
    cy.intercept({method: 'GET', url: Cypress.env('api_url') + '/**'}).as('validateFormData');
    cy.get('mat-icon[id="cypress test lesson"]:contains("undo")').click()
    cy.wait('@validateFormData')
    cy.wait(200)
    cy.contains("cypress test lesson").should('not.exist')
  })








  afterEach(()=>{
    cy.testViewport()
  })

})
