const { internet } = require('faker');

describe('additemPage tests', () => {
  before(() => {
    cy.log('will start additemPage tests');
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