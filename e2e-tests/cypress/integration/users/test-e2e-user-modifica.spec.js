const { nextTick } = require("process");



describe('Modifica component tests', () => {
    beforeEach(() => {
      cy.visit('/#/users');
    });

    it('pagina modifica dovrebbe caricarsi',()=>{

      /*var idUltimoUtente;


      var ultimoid=cy.get('th').last();
        cy.log(ultimoid);
        ultimoid.invoke('text').should((text)=>{

          cy.log(text)
          expect(text).not.to.eq(5)
        });*/
        





        cy.visit('/#/users/aggiungi');
        cy.get('#firstname')
        .type('testnome');

        cy.get('#firstname')
        .type('testnome');

        cy.get('#lastname')
        .type('testnome');

        cy.get('#dob')
        .type('1000-10-10');

        cy.get('#email')
        .type('prova@prova.prov');

        

        cy.get('button.submit')
        .click();

        cy.wait(1000);

        cy.visit('/#/users');

        cy.get('tr button')
        .last()
        .click();

        cy.get('#name')
        .should('be.visible')
        .type("test");

        cy.get('button.submit')
        .first()
        .click();

        cy.get('body')
        .should('contain','aggiornato');

        cy.get('#surname')
        .type('///');

        cy.get('button.submit')
        .first()
        .click();

        cy.get('body')
        .should('contain','non validi');

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
        .should('not.contain','Yankee');

        cy.get('div[type=button]')
        .first()
        .click();

        cy.get('body')
        .should('contain','distrutto');

        cy.wait(1001);

        cy.get('body')
        .should('not.contain','testnome');

    })



});