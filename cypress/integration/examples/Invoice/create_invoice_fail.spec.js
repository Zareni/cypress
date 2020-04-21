/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      //  https://invoicely.com/login
      cy.visit('https://zarkostepanov.invoicely.com/login')
      
    })
    //Assert elements in document on home page
    // https://invoicely.com/login
    it('greets with Log in to your account' ,() => {
    })     
     
  //Fail to create invoice
  it('Fail to create invoice', () => {
      cy.request('https://jsonplaceholder.cypress.io/comments')
      
    //Log in 
    cy.get('#email_address')
    .type('zarko.stepanov10@gmail.com')
    .should('have.value','zarko.stepanov10@gmail.com')
    .get('#password')  
    .type('tester').should('have.value', 'tester')

    //Submit
    .get('button')
    .contains('Log in').click()

    //Wellcome page
    cy.title('h1','Dashboard')
    cy.get('.main_button').click({ force: true })
    
    cy.get('.i_new_invoice').click({force: true })

    //Scroll to footer   
    cy.get('footer').scrollIntoView()

    //Click on the button Invoice service to produce alert message
    cy.get('[data-flippable="statement_settings"]').should('be.visible').and('not.be.disabled').click()

    //Alert message is present "Please specify a client/vendor first."
    cy.title('Please specify a client/vendor first.')
    .get('.alert').contains('Please specify a client/vendor first.')    
})
})