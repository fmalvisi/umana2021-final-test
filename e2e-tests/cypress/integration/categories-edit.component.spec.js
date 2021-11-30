describe('Edit component', () => {
  beforeEach(() => {
    cy.visit('/#/categories/edit/1');
  });

  it('should compile form', () => {
    const name = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 50);
    cy.get('#catName').clear().type(name);
    cy.get('#catDescr').clear().type(name);
  });

  it('should go back to category page', () => {
    cy.get('.button-wrapper > :nth-child(2)').click();
    cy.url()
      .should('eq', 'http://localhost:4200/#/categories')
      .and('not.contain', 'edit');
  });
});
