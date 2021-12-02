
describe('detailsPage tests', () => {
  beforeEach(() => {
    cy.visit("/#/items"); 
  });


  it('closing carousel and open details page after clicking details button', () => {
    cy.get('.carousel-item')
    .first()
    .find('button')
    .first()
    .click()
    .get('.dropdown-item')
    .first()
    .click();

    cy.url().should('contain', 'dettagli-oggetto');
  });
 
  it('clicking on the button Annulla to go back to the item page list', () => {
    cy.get('.carousel-item')
    .first()
    .find('button')
    .first()
    .click()
    .get('.dropdown-item')
    .first()
    .click();

    cy.get('button#annullabutton')
    .click()
    
    cy.url().should('not.contain', 'dettagli-oggetto')
    .and('contain','items');
  });

});