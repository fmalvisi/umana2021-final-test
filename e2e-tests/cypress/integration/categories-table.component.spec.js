describe('Homepage with table of categories component', () => {
  beforeEach(() => {
    cy.visit('/#/categories');
  });

  it('visits the initial project page', () => {
    cy.contains('Nome');
    cy.contains('Descrizione');
    cy.contains('Quantità');
    cy.get('table').should('be.visible');
  });

  it('clicks table button, opens and closes details info', () => {
    cy.get('table').find('button').first().click({ force: true });
    cy.contains('Dettaglio categoria').should('be.visible');
    cy.get('table').find('button').first().click({ force: true });
    cy.contains('Dettaglio categoria').should('not.exist');
  });

  it('clicks on filters and check the second one', () => {
    cy.get('#filter').click().type('Casa').should('be.visible');
  });

  it('clicks on add and open a new page', () => {
    cy.get('.top > :nth-child(2) > .btn').click();
    cy.on('url:changed', newUrl => {
      expect(newUrl).to.contain('/add');
    });
  });

  it('clicks on details to navigate to edit component', () => {
    cy.get('.desktop > .btn-light').eq(1).click();
    cy.get('.alert > .btn').click();
    cy.on('url:changed', newUrl => {
      expect(newUrl).to.contain('/edit/');
    });
  });
});
