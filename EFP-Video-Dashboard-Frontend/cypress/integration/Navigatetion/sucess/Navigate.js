
describe('Navigate to home page', function () {
  it('Tests Navigate to home page Success', function () {
    cy.visit('http://localhost:4200');
    cy.url().should('include', '/testimonials')
    // - query element


  });

  it('Tests Navigate to user detail page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/userDetail/5');
    cy.url().should('include', '/testimonials')
    // - query element


  });

  it('Tests Navigate to lesson page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/lesson/5');
    cy.url().should('include', '/testimonials')
    // - query element


  });

  it('Tests Navigate to lesson edit page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/direct-edit/lesson/5');
    cy.url().should('include', '/testimonials')
    // - query element

  });


  it('Tests Navigate to module edit page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/direct-edit/module/5');
    cy.url().should('include', '/testimonials')
    // - query element

  });


  it('Tests Navigate to mentor request page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/mentorRequest');
    cy.url().should('include', '/testimonials')
    // - query element

  });

  it('Tests Navigate to module page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/module/5');
    cy.url().should('include', '/testimonials')
    // - query element
  });


  it('Tests Navigate to module page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/modules/perfectplanning%28module%29/1/455/0');
    cy.url().should('include', '/testimonials')
    // - query element
  });

  it('Tests Navigate to section page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/sections/peopleskills%28section%29/0/452/3');
    cy.url().should('include', '/testimonials')
    // - query element
  });


  it('Tests Navigate to stepper fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/stepper');
    cy.url().should('include', '/testimonials')
    // - query element
  });

  it('Tests Navigate to testimonials pass', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/testimonials');
    cy.url().should('include', '/testimonials')
    // - query element
  });


  afterEach(()=>{
    cy.testViewport()
  })
});

