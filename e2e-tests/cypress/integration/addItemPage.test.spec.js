
describe('addItemPage tests', () => {
  beforeEach(() => {
    cy.visit("/#/items"); 
  });

  it('closing carousel and open Add page after clicking Nuovo Oggetto button', () => {
     
    cy.get('div.addItem a') 
    .click();

    cy.url().should('contain', 'aggiungi-oggetto'); 
  });
 
  it('clicking on the button Annulla to go back to the item page list', () => {
    cy.get('div.addItem a') 
    .click();

    cy.get('button#annullabottone')
    .click()
    
    cy.url().should('not.contain', 'aggiungi-oggetto')
    .and('contain','items');
  });

});