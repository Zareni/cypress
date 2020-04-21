/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      //  https://invoicely.com/login
      cy.visit('https://zarkostepanov.invoicely.com/login')
      
    })

    //Control the behavior of network requests and responses
it('default options on server', () => {
    cy.server().should((server) => {
    // the default options on server
    // you can override any of these options
    expect(server.delay).to.eq(0)
    expect(server.method).to.eq('GET')
    expect(server.status).to.eq(200)
    expect(server.headers).to.be.null
    expect(server.response).to.be.null
    expect(server.onRequest).to.be.undefined
    expect(server.onResponse).to.be.undefined
    expect(server.onAbort).to.be.undefined
    // pass false to disable existing route stubs
    expect(server.enable).to.be.true
    // forces requests that don't match your routes to 404
    expect(server.force404).to.be.false
    // whitelists requests from ever being logged or stubbed
    expect(server.whitelist).to.be.a('function')
})

cy.server({
method: 'POST',
delay: 1000,
status: 422,
response: {},
})

cy.request('https://jsonplaceholder.cypress.io/comments')
  .should((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.have.length(500)
    expect(response).to.have.property('headers')
    expect(response).to.have.property('duration')
  })
})
})
