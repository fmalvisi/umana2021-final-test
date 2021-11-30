import { type } from "os"

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/#/users')
  })
  it('faccio un test', () => {

   cy.get('#cercaNome')
   .type('Mario Rossi');
    cy.get('form button')
    .first()
    .click();
    cy.get('td')
    .first()
    .should('have.class', 'bg-light');

    cy.get('form button')
    .last()
    .click();
    cy.get('body')
    .should('not.contain', 'Paolo');
    cy.get('form button')
    .last()
    .click();
    cy.get('body')
    .should('contain', 'Paolo');
  
    cy.get('table button')
    .first()
    .click();
    cy.get('body')
    .should('contain', 'modifica il tuo utente')
  })
})