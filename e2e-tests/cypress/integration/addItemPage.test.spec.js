
describe('addItemPage tests', () => {
  beforeEach(() => {
    cy.visit("/#/items"); 
  });

  it('closing carousel and open Add page after clicking Nuovo Oggetto button', () => {
     
    cy.get('div.addItem a') 
    .click();

    cy.url().should('contain', 'aggiungi-oggetto'); 
  });

  it('clicking on the button Invia to check if the button is visible', () => {
    cy.get('div.addItem a') 
    .click();

    cy.get('button#inviabottone').should('not.be.enabled'); 
  });

  it('inserting data, clicking on the button Invia to visualize alert message and go back to the item page list', () => {
    cy.get('div.addItem a') 
    .click();

    cy.get('input#nameinput').type('Nome');
    cy.get('input#descriptioninput').type('Descrizione');
    cy.get('input#price_input').type('2'); 

    cy.get('button#inviabottone')
    .click()
    

    cy.get('div#alertsuccessdiv').should('be.visible');
    cy.wait(2000);
    cy.url().should('not.contain', 'aggiungi-oggetto')
    .and('contain','items');
  });

  it('clicking on the button Carica Immagine to visualize image', () => {
    cy.get('div.addItem a') 
    .click();

    cy.get('input#url').type('https://montagnolirino.it/wp-content/uploads/2015/12/immagine-non-disponibile-300x225.png');
     
    
    cy.get('button#caricaImg')
    .click();

    cy.get('img#imagefromurl')
    .should('be.visible');
     
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