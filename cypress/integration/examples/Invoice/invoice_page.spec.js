/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      //  https://invoicely.com/login
      cy.visit('https://zarkostepanov.invoicely.com/login')

      beforeEach(() => {
        // now this runs prior to every test
        // across all files no matter what
        cy.resetDb()
      })      
    })
   
  //login with sucess
  it('login success', () => {
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
    cy.contains('h1','Dashboard')  
    
    //Click Add New button
    cy.get('.main_button').click({ force: true })

    //Click Invoice
    cy.get('.i_new_invoice').click({force: true })

    //Lenght statemenet status
    cy.get('.statement_status').should('have.length', 1)
    cy.get('input').should('be.visible')
    .should('not.have.value', 'statement_status')
    cy.get('.statement_description').and('not.be.disabled')
    .should('not.have.value', 'title')

    //All visible input fields elements
    cy.get('.statement_status')
    .should('be.visible').and('not.be.disabled')

    //all text area are vidible
    cy.get('textarea').should('be.visible')

    //Assert Draft text
    cy.contains('Draft').should('be.visible')

    //Logo
    cy.get('.statement_logo_container')
    .should('be.visible').and('not.be.disabled')

    //Assert text form heading
    cy.get('[name="statement[custom_title]"]')
    .should('be.visible').and('not.be.disabled')
    
    //Assert text Invoice No.
    cy.get('.form_heading').contains('Invoice No.')

    //Input add on
    cy.get('.input_addon').contains('#')
    cy.get('[data-validate="required"]')
    .and('not.be.disabled')

    //Assert text Language
    cy.get('.language_select').contains('Language').should('be.visible')
    cy.get('.language_select').children()
    .should('have.length', 3).and('not.be.disabled')   

    //Assert text Currency
    cy.get('.currency_select').contains('Currency').should('be.visible')

    //Assert text From
    cy.get('.address_from').contains('From').should('be.visible')

    //Assert link text Edit Business Profile
    cy.contains('Edit Business Profile')
    .should('have.attr', 'href','/settings/business')

    //Assert text To
    cy.get('.address_to').contains('To')
    cy.contains('Edit Business Profile')
    .should('have.attr', 'href','/settings/business')

    //New Client
    cy.get('.form_heading')
    .contains('New Client')
    .should('have.attr', 'href', 'javascript:void(0)')
    .should('have.length', 1)
    
    //verify input fields and lenght
    cy.get('.relative')
    .and('not.be.disabled')
    .should('have.length', 4)

    //elemenet statments details lenght
    cy.get('.statement_details')
    .and('not.be.disabled')
    .should('have.length', 1)
    cy.get('.form_heading')
    .contains('Date')
    cy.get('#datepicker')
    .and('not.be.disabled')
    .should('have.length', 1)
    cy.get('.form_heading')
    .contains('Invoice Due')
    .should('have.length', 1)

    // Invoice Due options
    cy.get('.form_row').contains('option','Due on Receipt')
    cy.contains('option','After 7 days')
    cy.contains('option','After 15 days')
    cy.contains('option','After 30 days')
    cy.contains('option','After 60 days')
    cy.contains('option','Custom')
    .should('have.length', 1)

    //Purchase Order Number input field
    cy.get('input').should('not.have.value', 'statement_po_number')

    //Assert text Purchase Order Number
    cy.get('.form_row').contains('Purchase Order Number')

    //Assert text Description
    cy.get('.item_column_heading')
    cy.contains('h2','Description')

    //Description textarea
    cy.get('#item_textarea_1').should('be.visible').and('not.be.disabled')

    //Drag item
    cy.get('.drag_item').should('be.visible').and('not.be.disabled')

    //Data
    cy.get('.item_textarea').should('be.visible').and('not.be.disabled')

    //Assert text Quantity
    cy.get('.quantity').contains('h2','Quantity').should('be.visible')

    //Verify input field Quantity
    cy.get('.quantity_input').should('be.visible').and('not.be.disabled')

    //Assert text Rate
    cy.get('.item_column_heading').contains('h2','Rate').should('be.visible')

    //Verify input field Rate div
    cy.get('.inner').should('be.visible').and('not.be.disabled')

    //Verify input field Rate
    cy.get('.unit_input').should('be.visible').and('not.be.disabled')

    //Verify dropdown lower rate
    cy.get('.unit_lower').should('be.visible').and('not.be.disabled')
    cy.contains('option','Unit')
    cy.contains('option','pc')
    cy.contains('option','lb')
    cy.contains('option','ft')
    cy.contains('option','hrs')
    cy.contains('option','d')
    cy.contains('option','m')
    cy.contains('option','y')
    cy.contains('option','Custom')
    .should('have.length', 1)

    //Assert text Amount
    cy.get('.item_column_heading')
    .contains('h2','Amount')
    .should('be.visible')

    //Settings button dropdown-menu     
    cy.get('.dropdown-menu').contains('Delete')
    .should('have.attr', 'href', 'javascript:void(0)')

    cy.get('.dropdown-menu').contains('Save item')
    .should('have.attr','href','javascript:void(0)')
    .and('not.be.disabled')

    //New line button dropdown
    cy.get('.relative').contains('New Line')
    .should('have.attr','href','javascript:void(0)')
    .should('have.length', 1)
    .should('be.visible').and('not.be.disabled')
    .click()
    
    //Item in dropdown-menu
    cy.get('.dropdown-menu')
    .contains('Item')
    .should('have.length', 1)
    .should('have.attr', 'href', 'javascript:void(0)')
    .should('be.visible').and('not.be.disabled')

    //Expense in dropdown-menu
    cy.get('.dropdown-menu')
    .contains('Expense')
    .should('have.attr', 'href', 'javascript:void(0)')
    .should('be.visible').and('not.be.disabled')

    //Mileage in dropdown-menu
    cy.get('.dropdown-menu')
    .contains('Mileage')
    .should('have.attr', 'href', 'javascript:void(0)')
    .should('be.visible').and('not.be.disabled')

    //Time in dropdown-menu
    cy.get('.dropdown-menu')
    .contains('Time')
    .should('have.attr', 'href', 'javascript:void(0)')
    .should('be.visible').and('not.be.disabled')

    //Assert text Sub Total
    cy.get('.col').contains('Sub Total')
    .should('be.visible')

    //Assert text Total (USD)
    cy.get('.col').contains('Total (USD)')
    .should('be.visible')

    //Assert text Balance
    cy.get('.td_label').contains('Balance')
    .should('be.visible')

    //Assert text td_currency
    cy.get('.td_currency').contains('USD')
    .should('be.visible')

    //Assert link text Manage Default Taxes
    cy.contains('Manage Default Taxes')
    .should('have.attr', 'href','/settings/taxes')
    .should('be.visible').and('not.be.disabled')

    //Assert Tax option
    cy.get('.tax')
    .should('have.attr', 'href', 'javascript:void(0)')
    .should('be.visible').and('not.be.disabled')

    //Assert Discount option
    cy.get('.discount')
    .should('have.attr', 'href', 'javascript:void(0)')
    .should('be.visible').and('not.be.disabled')

    //Assert Shipping option
    cy.get('.shipping')
    .should('have.attr', 'href', 'javascript:void(0)')
    .should('be.visible').and('not.be.disabled')

    //Assert text Invoice Note and (Default Note) link text
    cy.get('.mt40').contains('Invoice Note')
    cy.contains('Default Note')
    .should('have.attr', 'href','/settings/emails/edit/invoice_default_note')
    .should('be.visible').and('not.be.disabled')
    cy.get('textarea').and('not.be.disabled')
    cy.get('[data-flippable="statement_settings"]').should('be.visible').and('not.be.disabled')
    })
})