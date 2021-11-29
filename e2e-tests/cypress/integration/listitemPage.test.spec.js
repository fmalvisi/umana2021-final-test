const { internet } = require('faker');
const { waitForDebugger } = require('inspector');

describe('listitemPage tests', () => {
  beforeEach(() => {
    cy.visit("/#/items");  
  });

  xit('clicking on the navbar the item section', () => {
    cy.url().should('contain', 'items'); 
  });

  xit('should delete one item and return in itemlist path', () => {
    
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
 
  it('testing category Casa filter', () => {
    
    cy.get('#carouselExampleIndicators div.card').then(cards => {
      const initialElements = cards.length;
      const cardsExpected = 3;
    cy.get('button#btnFiltriF')
    .click(); 

    cy.get('button#categoryFilter')
    .click();

    cy.get('#flexSwitchCheckDefault')
    .first()
    .check();

    cy.get('button#btnFiltriA')
    .click();

    cy.wait(1000);

    cy.get('div.card2')
    .then(cards => { 
      expect(cards.length).equal(cardsExpected);
    });
  }); 
  });

  it('testing user Mario Rossi filter', () => {
    
    cy.get('#carouselExampleIndicators div.card').then(cards => {
      const initialElements = cards.length;
      const cardsExpected = 1;
    cy.get('button#btnFiltriF')
    .click(); 

    cy.get('button#userFilter')
    .click();

    cy.get('input#inputUtente').first().type("Mario");

    cy.get('a.listutenti')
    .first()
    .click(); 

    cy.get('button#btnFiltriA')
    .click();

    cy.wait(1000);

    cy.get('div.card2')
    .then(cards => { 
      expect(cards.length).equal(cardsExpected);
    });
  }); 
  });

  it('testing object Tavolo filter', () => {
    
    cy.get('#carouselExampleIndicators div.card').then(cards => {
      const initialElements = cards.length;
      const cardsExpected = 1;
    cy.get('button#btnFiltriF')
    .click(); 

    cy.get('button#nomeOggettoFilter')
    .click();

    cy.get('input#inputOggetto').first().type("Tavolo");

    cy.get('a.listoggetti')
    .first()
    .click(); 

    cy.get('button#btnFiltriA')
    .click();

    cy.wait(1000);

    cy.get('div.card2')
    .then(cards => { 
      expect(cards.length).equal(cardsExpected);
    });
  }); 
  });

});
