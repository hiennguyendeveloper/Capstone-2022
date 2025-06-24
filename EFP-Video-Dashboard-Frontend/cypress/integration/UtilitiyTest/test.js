describe('User Detail Test', function () {

  it('test interceptor ', function () {
    cy.login()
    cy.visit('http://localhost:4200/');
    cy.request({method:'POST', url:'http://localhost:8080/api/v1/ThisWILLFAIL',failOnStatusCode: false})
      .then((response)=>{
        expect(response.status).to.eq(403)
      })
    });



  it('token expired', function () {
    window.localStorage.setItem('userData.', {
      "email": "chrisl10@escapefrompoverty.org",
      "exp": "2022-04-22T06:45:10.000Z",
      "role": [
        "0"
      ],
      "access_token": "aXNzIjoiaHR0cHM6Ly9hcHAuZXNjYXBlZnJvbXBvdmVydHkub3JnIiwiZXhwIjoxNjUwNjA5OTEwfQ.PgaWmNqHx8vxFrj54zIf1HK_Qjy-zNtJ5wNwfSqy7WA"
    });
    cy.visit('http://localhost:4200/');

  });

  it('view lesson', function () {
    cy.login()
    cy.visit('http://localhost:4200/lesson/98');
    cy.testViewport()
    cy.viewport('ipad-2')
  });

})
