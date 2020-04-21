/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      //  https://invoicely.com/login
      cy.visit('https://zarkostepanov.invoicely.com/login')      
    })

    //login with sucess 
    //Create new user
    //Create new invoice with success
    it('create new user and new invoice', () => {
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

    //Click on Add new
    cy.get('.main_button').click({ force: true })

    //Click on Invoice
    cy.get('.i_new_invoice').click({force: true })
    
    //Input text in Invoice inputfield Add Description    
    cy.get('.statement_description').type('Monthly web updates')
    
    //Create new client
    //Click on linktext
    cy.get('.form_heading').contains('New Client').click()
    .wait(2000)

    //Modal header
    cy.get('#create_edit_connection_popup').should('be.visible')
    cy.title('h1','New Client')
    cy.get('.individual').contains('Individual')
    .should('be.visible').and('not.be.disabled')
    cy.get('.organization').contains('Organization')
    .should('be.visible').and('not.be.disabled')

    //Input first name
    cy.get('[name="connection[first_name]"]')
    .eq(0).should('be.visible').and('not.be.disabled')
    .type('Marko')

    //Input last name
    cy.get('[name="connection[last_name]"]')
    .eq(0).should('be.visible').and('not.be.disabled')
    .type('Markovic')

    //Input email
    cy.get('[name="connection[email_address]"]')
    .should('be.visible').and('not.be.disabled')
    .type('markovic@mailinator.com')

    //Input phone number
    cy.get('[name="connection[phone]"]')
    .should('be.visible').and('not.be.disabled')
    .type('+38164258258')

    //Input phone Street 1
    cy.get('[name="connection[street_1]"]')
    .should('be.visible').and('not.be.disabled')
    .type('Novosadska')

    //Input phone City
    cy.get('[name="connection[city]"]')
    .should('be.visible').and('not.be.disabled')
    .type('Novi Sad')

    //Input phone State
    cy.get('[name="connection[state]"]')
    .should('be.visible').and('not.be.disabled')
    .type('Novosadska')

    //Input phone Postal Code
    cy.get('[name="connection[postal_code]"]')
    .should('be.visible').and('not.be.disabled')
    .type('21000')

    //Select country
    cy.get('[name="connection[country]"]')
    .should('be.visible').and('not.be.disabled')
    .select('Serbia').should('have.value', 'RS')

    //Show more
    cy.get('.more_client_details_button')
    .contains('Show more').click()

    //Show less
    cy.get('.more_client_details_button')
    .contains('Show less')

    //Fax number
    cy.get('.form_heading').contains('Fax Number')
    cy.get('[name="connection[fax]"]')
    .should('be.visible').and('not.be.disabled')
    .type('+36546546466') 

    //Website URL
    cy.get('.form_heading').contains('Website URL')
    cy.get('[name="connection[website_url]"]')
    .should('be.visible').and('not.be.disabled')
    .type('some_page.com')

    //Notes
    cy.get('[name=notes]')
    .should('be.visible').and('not.be.disabled')
    .type('some notes about client')

    //Click Save & Return
    .get('button').contains('Save & Return').click()
    
    //Alert success Client added assert text and visibility
    cy.get('#alerts').should('be.visible')
    cy.title('p','Client added.')
    cy.get('.success').contains('Client added.')
  
    //Select option due Receipt
    cy.get('[name="statement[due]"]')
    .should('be.visible').and('not.be.disabled')
    .select('After 7 days').should('have.value', '7')

    //Purchase Order Number
    cy.get('[name="statement_po_number"]')
    .should('be.visible').and('not.be.disabled')
    .type('1')

    //Description
    cy.get('[name="statement[item_name_description]"]')
    .should('be.visible').and('not.be.disabled')
    .type('Some description')

    //Quantity
    cy.get('[name="statement[item_quantity]"]')
    .should('be.visible').and('not.be.disabled')
    .type('10')

    //Rate
    cy.get('[name="statement[item_rate]"]')
    .should('be.visible').and('not.be.disabled').clear()
    .type('10')

    //Assert amount 100
    cy.get('.status_line').should('be.visible').title('100')

    //Bill note 
    cy.get('[name="statement[notes]"]')
    .should('be.visible').and('not.be.disabled')
    .type('Bill Note')

    //Click button Invoice settings
    cy.get('[data-flippable="statement_settings"]')
    .should('be.visible').and('not.be.disabled').click()
    
    //Invoice Settings assert text
    cy.title('h2','Invoice Settings')
    cy.contains('h2','Invoice Settings')  

    //Payment Methods
    cy.title('h2','Payment Methods')
    cy.contains('h2','Payment Methods')

    //Add and remove payment integrations
    cy.contains('Your Payment Integrations')
    .should('have.attr', 'href','/settings/payment_integrations')
    cy.contains('Add one here')
    .should('have.attr', 'href','/settings/payment_integrations')

    //Other Settings
    cy.title('h2','Other Settings')
    cy.contains('h2','Other Settings')

    //Checkboxses
    //Send automatic payment reminders
    cy.get('[name="statement[send_reminders]"]')
    .should('be.visible').and('not.be.disabled')
    .check({ force: true }).should('be.checked')  

    //Allow client to make partial payments for this invoice
    cy.get('[name="statement[partial_payments]"]')
    .should('be.visible').and('not.be.disabled')
    .check({ force: true }).should('be.checked') 

    //Send automatic payment receipts for all payments
    cy.get('[name="statement[send_receipts]"]')
    .should('be.visible').and('not.be.disabled')
    .check({ force: true }).should('be.checked') 

    //Delivery
    cy.title('h2','Delivery')
    cy.contains('h2','Delivery')

    //Attach PDF copy to email
    cy.get('#attach_pdf_copy')
    .should('be.visible')
    .and('not.be.disabled')
    .should('not.be.checked')

    //Radiobutton
    //Send default email to recipient (Email Templates)
    //Send default email to recipient
    cy.get('#default')
    .should('be.visible').and('not.be.disabled')
    .should('be.checked')
      
    cy.get('#custom')
    .should('be.visible').and('not.be.disabled')
    .should('not.be.checked')

    // Send a custom email
    cy.get('[type="radio"]').first().should('be.checked')

    //Email template link text
    cy.contains('Email Templates')
    .should('have.attr', 'href','/settings/emails')

    //To - should be disabled
    cy.get('#custom_email_to')

    //Subject - should be disabled
    cy.get('#custom_email_subject')
    
    //Message - should be disabled
    cy.get('#custom_email_subject')
    
    //Click on Continue dropdown
    cy.get('.is_dropdown')
    .should('be.visible')
    .contains('Continue').click({force: true})
        
    //Clik on Continue button
    cy.get('.is_dropdown').contains('Save')
    .click({force: true})
    
    //Assert dropdown elements
    cy.get('.is_dropdown').contains('Save')    
    cy.get('[data-submit-statement-action="save"]').contains('Save')
    cy.get('[data-submit-statement-action="save_send"]').contains('Save & Send')
    cy.get('[data-submit-statement-action="save_mark_sent"]').contains('Save & Mark Sent')

    //Click Save and send
    cy.get('[data-submit-statement-action="save_send"]')
    .contains('Save & Send').click()

    //Alert message - Invoice added.
    cy.get('#alerts').should('be.visible')
    cy.title('p','Invoice added.')
    cy.get('.success').contains('Invoice added.')

    //Click Send button
    cy.get('[data-form-id="send_statement"]').contains('Send').click()

    //Alert message - Security check failed: You were too quick clicking the button, please try again now or refresh this page.
    cy.get('#alerts').should('be.visible')
    cy.title('p','Security check failed: You were too quick clicking the button, please try again now or refresh this page.')
    cy.get('.error')
    .contains('Security check failed: You were too quick clicking the button, please try again now or refresh this page.')
    .wait(2000)
    //Need 2 sec to spinner reload button

    //Click again - Send button
    cy.get('[data-form-id="send_statement"]').contains('Send').click()
    
    //Alert message 
    cy.get('#alerts').should('be.visible')
    cy.title('p','Sent successfully.')
    cy.get('.success').contains('Sent successfully.')
    
    //Click on Actions dropdown-menu
    cy.contains('Actions').click({force: true})

    //Assert dropdown-menu
    //Public Preview
    cy.get('.i_preview').should('be.visible')
    .and('not.be.disabled').contains('Public Preview')

    //Mark as Paid
    cy.get('.permission_edit').should('be.visible')
    .and('not.be.disabled').contains('Mark as Paid')

    //Mark as Draft
    cy.get('[data-direct-action="direct"]').should('be.visible')
    .and('not.be.disabled').contains('Mark as Draft')

    //Send Invoice
    cy.get('[data-ajax-get-file="send_statement"]').should('be.visible')
    .and('not.be.disabled').contains('Send Invoice')

    //Download as PDF
    cy.get('[data-action="download_started_info"]').should('be.visible')
    .and('not.be.disabled').contains('Download as PDF')

    //Invoice Activity
    cy.get('.i_activity').should('be.visible')
    .and('not.be.disabled').contains('Invoice Activity')

    //Post Comment
    cy.get('.i_post_comment').should('be.visible')
    .and('not.be.disabled').contains('Post Comment')

    //Manage Payments
    cy.get('.i_manage_payments').should('be.visible')
    .and('not.be.disabled').contains('Manage Payments')

    //Duplicate Invoice
    cy.get('[data-ajax-get-type="invoice"]').should('be.visible')
    .and('not.be.disabled').contains('Duplicate Invoice')

    //Duplicate as Recurring
    cy.get('[data-ajax-get-type="recinvoice"]').should('be.visible')
    .and('not.be.disabled').contains('Duplicate as Recurring')

    //Cancel
    cy.get('.i_cancel').should('be.visible')
    .and('not.be.disabled').contains('Cancel')

    //Archive
    cy.get('.i_archive').should('be.visible')
    .and('not.be.disabled').contains('Archive')

    //Delete
    cy.get('.i_delete').should('be.visible')
    .and('not.be.disabled').contains('Delete')

    //Archive
    cy.get('.i_archive').should('be.visible')
    .and('not.be.disabled').contains('Archive').click()

    //Assert Modal dialog Confirmation 
    cy.get('.x_content').should('be.visible')
    cy.contains('h1','Confirmation')
    cy.get('#confirm').should('be.visible')
    cy.contains('p','Are you sure you want to archive this item?')
    cy.get('.save_button').should('be.visible')
    .should('not.be.disabled').contains('Confirm')
    cy.get('.cancel_button ').should('be.visible')
    .should('not.be.disabled').contains('Cancel')

    //Click button Confirm
    cy.get('button').should('be.visible')
    .click({force: true})
    .wait(3000)
    //Need to wait to response alert message

    //Your invoice has been archived.
    cy.get('#alerts').should('be.visible')
    cy.get('.success').contains('Your invoice has been archived.')

    //Invoice assert elements
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    cy.get('#view_invoice').should('be.visible')
    cy.get('.page').should('be.visible')
    cy.get('.statement_status').contains('sent')
    cy.get('.statement_contacts').should('be.visible')
    cy.get('.statement_details').should('be.visible')
    cy.get('#drag_item_list').should('be.visible')
    cy.get('.totals_container').should('be.visible')
    cy.get('[data-format-number="precision"]').should('have.value', 'USD 100.00')
  })
})