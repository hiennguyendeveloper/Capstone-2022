describe('User login WEB API: Test ', function (){
  it('User login Success', function () {
      cy.request('POST', 'http://localhost:8080/api/v1/user/login',{
        "email":"chrisl10@escapefrompoverty.org",
        "password":"!QAZ1qaz!QAZ1qaz"
      });

    }
  )
});
