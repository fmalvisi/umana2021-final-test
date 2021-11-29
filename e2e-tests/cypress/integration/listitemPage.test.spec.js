const { internet } = require('faker');
const { waitForDebugger } = require('inspector');

describe('listitemPage tests', () => {
  beforeEach(() => {
    cy.visit("/#/items");  
  });

  it('clicking on the navbar the item section', () => {
    cy.url().should('contain', 'items'); 
  });

  it('should delete one item and return in item path', () => {
    
    cy.get('#carouselExampleIndicators div.card').then(cards => {
      const initialElements = cards.length;

    cy.get('.carousel-item')
    .first()
    .find('button')
    .first()
    .click()
    .get('.dropdown-item')
    .eq(2)
    .click();

    cy.wait(1000);

    cy.get('#carouselExampleIndicators div.card').then(cards => { 
      expect(cards.length).equal(initialElements - 1);
    });
  });
  cy.url().should('eq', 'http://localhost:4200/#/items');
  });
 

});
