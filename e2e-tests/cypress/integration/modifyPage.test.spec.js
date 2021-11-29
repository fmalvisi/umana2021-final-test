const { internet } = require('faker');

describe('modifyPage tests', () => {
  beforeEach(() => {
    cy.visit("/#/items"); 
  });

  
it('closing carousel and open Modify page after clicking Modifica Oggetto button', () => {
     
  cy.get('a.modifyItem a') 
  .click();

  cy.url().should('contain', 'modifica-oggetto'); 
});
 
});

it('clicking on the button Invia to check if the button is visible', () => {
  cy.get('a.modifyItem a') 
  .click();

  cy.get('button#inviabottone').should('not.be.enabled'); 
});

it('inserting data, clicking on the button Invia to visualize alert message and go back to the item page list', () => {
  cy.get('a.modifyItem a') 
  .click();

  cy.get('input#name_input').type('Nome');
  cy.get('input#description_input').type('Descrizione');
  cy.get('input#price_input').type('2'); 

  cy.get('button#inviabottone')
  .click()
  

  cy.get('div#alertsuccessdiv').should('be.visible');
  cy.wait(2000);
  cy.url().should('not.contain', 'aggiungi-oggetto')
  .and('contain','items');
});

