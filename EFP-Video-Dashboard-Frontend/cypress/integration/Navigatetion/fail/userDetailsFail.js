describe('User detail page fail ', function () {
it('Tests submit button in user detail page fail', function () {
  //arrange
  // - visit app
  cy.visit('http://localhost:4200/userDetail/999999999');
  cy.url().should('include', '/')

  // - query element

});


  afterEach(()=>{
    cy.testViewport()
  })
});
