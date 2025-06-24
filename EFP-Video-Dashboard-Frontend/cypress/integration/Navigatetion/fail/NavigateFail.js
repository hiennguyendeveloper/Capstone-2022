
describe('Navigate to home page ', function () {

  beforeEach(() => {
    cy.login()
    cy.visit('http://localhost:4200');

  })


// _________________________________________________________login success
  it('Tests Navigate to home page Success', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200');
    cy.wait(200);
    cy.url().should('include', '/')
    // - query element

  });

//_____________________________________________________________user detail
  it('Tests Navigate to user detail page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/userDetail/9999');
    cy.wait(200);
    cy.url().should('include', '/')

    // - query element


  });

//___________________________________________________________lesson
  it('Tests Navigate to lesson page fail', function () {
    //arrange
    // - visit app
    //todo: finish building out component
    cy.visit('http://localhost:4200/lesson/9999');
    cy.wait(200);
    cy.url().should('include', '/testimonials')
    // - query element*/

  });

  it('Tests Navigate to edit lesson page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/direct-edit/lesson/9999');
    cy.wait(200);
    cy.url().should('include', '/testimonials')
    // - query element

  });


  // _____________________________________________________module
  it('Tests Navigate module page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/module/9999');
    cy.wait(200);
    cy.url().should('include', '/testimonials')
    // - query element
  });

  it('Tests Navigate to edit module page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/direct-edit/module/9999');
    cy.wait(200);
    cy.url().should('include', '/testimonials')
    // - query element

  });

  it('Tests Navigate to module perfect plaining page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/modules/perfectplanning%28module%29/1/999/0');
    cy.wait(200);
    cy.url().should('include', '/testimonials')
    // - query element
  });



//___________________________________________________________________mentor request

  it('Tests Navigate to mentor request page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/mentorRequest/99');
    cy.wait(200);
    cy.url().should('include', '/testimonials')
    // - query element

  });



//________________________________________________________________________section/ people skill

  it('Tests Navigate to sections people skill section page fail', function () {
    //arrange
    // - visit app
    cy.visit('http://localhost:4200/sections/peopleskills%28section%29/0/9999/3');
    cy.wait(200);
    cy.url().should('include', '/testimonials')
    // - query element
  });



  afterEach(()=>{
    cy.testViewport()
  })


});

