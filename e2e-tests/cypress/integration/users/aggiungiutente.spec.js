describe ('Aggiungi validate tests', () => {
    beforeEach(() => {
        cy.visit('#/users/aggiungi');
        
    });
    it ('Name should not be empty', () => {
        cy.get("#firstname")
        .should('not.have.class', 'req')
        .click();
        cy.get("body")
        .not("contain","Name is required")
        .not("contain","Lastname is required")
        cy.get("#lastname")
        .should('not.have.class', 'req')
        .click();
        cy.get("#email")
        .should('not.have.class', 'req')
        .click();
        cy.get("#dob")
        .should('not.have.class', 'req')
        .click();
        cy.get("#firstname")
        .should('not.have.class', 'req')
        .click();

        cy.get("body")
        .should("contain", "Name is required.")
        .should("contain", "Cognome is required.")
        .should("contain", "Email is required.")
        .should("contain", "Data di ");
        cy.get("#firstname")
        .type("testfinale")
        cy.get("#lastname")
        .type("derraj")
        cy.get("#dob")
        .type("1997-05-18")
        cy.get("#email")
        .type("dbarisl@gmail.com")

        cy.get('button[type="submit"]').click() 
        cy.wait(1000);
        cy.get("body")
        .should("contain","testfinale");
        cy.get("tr button")
        .last()
        .click()
        cy.wait(1000)
        cy.get("div[type=button]")
        .first()
        .click()


    });

    
  

})