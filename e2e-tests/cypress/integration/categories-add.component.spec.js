describe('Add component', () => {
  beforeEach(() => {
    cy.visit('/#/categories/add');
  });

  it('should compile form', () => {
    const name = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 50);
    cy.get('#add-categ-name').clear().type(name);
    cy.get('#add-categ-descr').clear().type(name);
  });

  it('click on the back button and to go the category page', () => {
    cy.get('.btn-light').click();
    cy.url()
      .should('eq', 'http://localhost:4200/#/categories')
      .and('not.contain', 'add');
  });
});
