const { internet } = require('faker');

describe('detailsPage tests', () => {
  before(() => {
    cy.log('will start detailsPage tests');
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