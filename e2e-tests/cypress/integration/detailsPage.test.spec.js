const { internet } = require('faker');

describe('detailsPage tests', () => {
  before(() => {
    cy.log('will start detailsPage tests');
  });

  it('closing carousel and open details page after click details button', () => {
    cy.get('carousel-item')
    .first()
    .find('button')
    .get('dropdown-item')
    .first()
    .click();

    cy.url().should('contain', 'dettagli-oggetto');
  });
 

});