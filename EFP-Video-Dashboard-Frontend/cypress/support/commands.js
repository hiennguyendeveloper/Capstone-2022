// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {

  cy.visit('http://localhost:4200/cypress-testing-login/chrisl10@escapefrompoverty.org/!QAZ1qaz!QAZ1qaz')
  cy.url().should('equal', 'http://localhost:4200/')

})


Cypress.Commands.add('testViewport', () => {

  cy.viewport('ipad-2')
  cy.viewport('ipad-mini')
  cy.viewport('iphone-3')
  cy.viewport('iphone-4')
  cy.viewport('iphone-5')
  cy.viewport('iphone-6')
  cy.viewport('iphone-6+')
  cy.viewport('iphone-7')
  cy.viewport('iphone-8')
  cy.viewport('iphone-x')
  cy.viewport('iphone-xr')
  cy.viewport('iphone-se2')
  cy.viewport('macbook-11')
  cy.viewport('macbook-13')
  cy.viewport('macbook-15')
  cy.viewport('macbook-16')
  cy.viewport('samsung-note9')
  cy.viewport('samsung-s10')
  cy.viewport(200, 200)
  cy.viewport(300, 300)
  cy.viewport(400, 400)
  cy.viewport(500, 500)
  cy.viewport(600, 600)
  cy.viewport(700, 700)
  cy.viewport(800, 800)
  cy.viewport(900, 900)
  cy.viewport(1000, 1000)
  cy.viewport(1100, 1100)
  cy.viewport(1200, 1200)
  cy.viewport(1300, 1300)
  cy.viewport(1400, 1400)
  cy.viewport(1500, 1500)
  cy.viewport(1600, 1600)
  cy.viewport(1700, 1700)
  cy.viewport(1800, 1800)
  cy.viewport(1900, 1900)
  cy.viewport(2000, 2000)
  cy.viewport(2100, 2100)
  cy.viewport(2200, 2200)
  cy.viewport(2300, 2300)
  cy.viewport(2400, 2400)
  cy.viewport(2500, 2500)
  cy.viewport(2600, 2600)
  cy.viewport(2700, 2700)
  cy.viewport(2800, 2800)
  cy.viewport(2900, 2900)
  cy.viewport(3000, 3000)
  cy.viewport(4000, 4000)
  cy.viewport('ipad-2', 'landscape')
  cy.viewport('ipad-mini', 'landscape')
  cy.viewport('iphone-3', 'landscape')
  cy.viewport('iphone-4', 'landscape')
  cy.viewport('iphone-5', 'landscape')
  cy.viewport('iphone-6', 'landscape')
  cy.viewport('iphone-6+', 'landscape')
  cy.viewport('iphone-7', 'landscape')
  cy.viewport('iphone-8', 'landscape')
  cy.viewport('iphone-x', 'landscape')
  cy.viewport('iphone-xr', 'landscape')
  cy.viewport('iphone-se2', 'landscape')
  cy.viewport('macbook-11', 'landscape')
  cy.viewport('macbook-13', 'landscape')
  cy.viewport('macbook-15', 'landscape')
  cy.viewport('macbook-16', 'landscape')
  cy.viewport('samsung-note9', 'landscape')
  cy.viewport('samsung-s10', 'landscape')
  cy.viewport(200, 200, 'landscape')
  cy.viewport(300, 300, 'landscape')
  cy.viewport(400, 400, 'landscape')
  cy.viewport(500, 500, 'landscape')
  cy.viewport(600, 600, 'landscape')
  cy.viewport(700, 700, 'landscape')
  cy.viewport(800, 800, 'landscape')
  cy.viewport(900, 900, 'landscape')
  cy.viewport(1000, 1000, 'landscape')
  cy.viewport(1100, 1100, 'landscape')
  cy.viewport(1200, 1200, 'landscape')
  cy.viewport(1300, 1300, 'landscape')
  cy.viewport(1400, 1400, 'landscape')
  cy.viewport(1500, 1500, 'landscape')
  cy.viewport(1600, 1600, 'landscape')
  cy.viewport(1700, 1700, 'landscape')
  cy.viewport(1800, 1800, 'landscape')
  cy.viewport(1900, 1900, 'landscape')
  cy.viewport(2000, 2000, 'landscape')
  cy.viewport(2100, 2100, 'landscape')
  cy.viewport(2200, 2200, 'landscape')
  cy.viewport(2300, 2300, 'landscape')
  cy.viewport(2400, 2400, 'landscape')
  cy.viewport(2500, 2500, 'landscape')
  cy.viewport(2600, 2600, 'landscape')
  cy.viewport(2700, 2700, 'landscape')
  cy.viewport(2800, 2800, 'landscape')
  cy.viewport(2900, 2900, 'landscape')
  cy.viewport(3000, 3000, 'landscape')
  cy.viewport(4000, 4000, 'landscape')


})
