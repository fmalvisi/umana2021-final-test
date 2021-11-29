const { internet } = require('faker');

describe('listitemPage tests', () => {
  before(() => {
    cy.log('will start listitemPage tests');
  });

  it('should load homepage', () => {
    cy.visit('');
    cy.contains('Esercitazione Finale').should('be.visible');
    cy.screenshot();
  });

  it('should load homepage (iphone view)', () => {
    cy.viewport('iphone-6');
    cy.visit('');
    cy.contains('Esercitazione Finale').should('be.visible');
    cy.screenshot();
  });

});
