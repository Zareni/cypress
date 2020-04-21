 /// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      //  https://invoicely.com/login
      cy.visit('https://zarkostepanov.invoicely.com/login')
    })
    //assert text document and text on login form
     // https://invoicely.com/login
    it('greets with Log in to your account' ,() => {
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
        cy.contains('h2','Log in to your account')
        cy.contains('Email Address')
        cy.contains('Password')
    })

    //Assert link text forgot password
    it('link /password/forgot', () => {
        cy
        .contains('Forgot Password')
        .should('have.attr', 'href','/password/forgot')
    })

    //Assert text email address and password
    it ('contain board login text', () => {
        cy.contains('h2','Log in to your account')
        cy.contains('Email Address')
        cy.contains('Password')
    })  

    //Submit with emty fields Email and Password
    //Missing alert message after clicking button Login on empty imput fields email and password 
    it('requires email and password', () => {
        cy.get('button').contains('Log in').click()
        //After submit
        cy.get('#email_address').should('not.have.css', 'background', 'rgb(0,0,0)')
        cy.get('#password').should('not.have.css', 'background', 'rgb(252, 227, 228)')
        cy.get('#alerts')
    //Missing an alert message text "Required fields email and password"   
     })

    //Fail to login (invalid email)
    it('fail to login invalid email', () => {
        cy
        .get('#email_address')
        .type('zarko.stepanov10').should('have.value','zarko.stepanov10')
        .get('#password')  
        .type('teste').should('have.value', 'teste')
        .get('button').contains('Log in').click()
        cy.get('#email_address').should('not.have.css', 'background', 'rgb(252, 227, 228)')      
    })  

    //Fail to login (empty password)
    it('fail to login empty password', () => {
        cy
        .get('#email_address')
        .type('zarko.stepanov10@gmail.com').should('have.value','zarko.stepanov10@gmail.com')
        .get('button').contains('Log in').click()
        cy.get('#password').should('not.have.css', 'background', 'rgb(252, 227, 228)')      
    })

    //Fail to login (invalid email or password)
    it('alert message fail to login', () => {
        cy
        .get('#email_address')
        .type('zarko.stepanov10@gmail.com').should('have.value','zarko.stepanov10@gmail.com')
        .get('#password')  
        .type('teste').should('have.value', 'teste')
        .get('button').contains('Log in').click()
        cy.get('#alerts')        
        .should('contain', 'Invalid email or password. Please try again.')
    })  

    //login with sucess
    it('login success', () => {
        cy
        .get('#email_address')
        .type('zarko.stepanov10@gmail.com').should('have.value','zarko.stepanov10@gmail.com')
        .get('#password')  
        .type('tester').should('have.value', 'tester')
        .get('button').contains('Log in').click()
        //.wait(1000)
        cy.contains('h1','Dashboard')
    })

    //logout with sucess
    it('logout success', () => {
        cy
        .get('#email_address')
        .type('zarko.stepanov10@gmail.com').should('have.value','zarko.stepanov10@gmail.com')
        .get('#password')  
        .type('tester').should('have.value', 'tester')
        .get('button').contains('Log in').click()
        cy.contains('h1','Dashboard')   
        .get('.sb_dropdown').click({ force: true })
        cy.contains('Log Out').click()
        
    })
})