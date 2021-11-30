describe('Modifica component tests', () => {
    beforeEach(() => {
      cy.visit('/#/users/modifica/1');
    });

    it('pagina modifica dovrebbe caricarsi',()=>{
        cy.get('#name')
        .should('be.visible')
        .type("test");

        cy.get('button.submit')
        .first()
        .click();

        cy.get('body')
        .should('contain','aggiornato');

        cy.get('.col-xl-6 button')
          .first()
          .click();
        
        cy.get('.col-xl-6')
        .first()
        .should('contain','Yankee');

        cy.get('div[type=button]')
        .first()
        .click();

        cy.get('body')
        .should('contain','distruggere');

        cy.get('.col-xl-6 button')
        .first()
        .click();
        
        cy.get('.col-xl-6')
        .first()
        .not('contain','Yankee');



    })



});