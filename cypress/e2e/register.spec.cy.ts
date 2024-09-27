describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
    });

    it('should display the NavBar', () => {
        cy.get('nav').should('be.visible');
    });

    it('should display the registration form', () => {
        cy.contains('h1', 'Créer un compte').should('be.visible');

        cy.get('input[placeholder="Username"]').should('be.visible');
        cy.get('input[placeholder="Email"]').should('be.visible');
        cy.get('input[placeholder="Mot de passe"]').should('be.visible');

        cy.get('button[type="submit"]').contains("S'inscrire").should('be.visible');
    });

    it('should display the footer', () => {
        cy.get('.footer-container').should('be.visible');
    });

    it('should show validation errors for empty fields', () => {
        cy.get('button[type="submit"]').click();
        
        cy.get('input[placeholder="Username"]:invalid').should('exist');
        cy.get('input[placeholder="Email"]:invalid').should('exist');
        cy.get('input[placeholder="Mot de passe"]:invalid').should('exist');
     });
    
    it('should show error for invalid email format', () => {
        cy.get('input[placeholder="Username"]').type('testuser');
        cy.get('input[placeholder="Email"]').type('invalid-email');
        cy.get('input[placeholder="Mot de passe"]').type('password123');
        
        cy.get('button[type="submit"]').click();
        
        cy.get('input[placeholder="Email"]:invalid').should('exist');
    });

    it('should show error message for existing email', () => {
        cy.get('input[placeholder="Username"]').type('testuser');
        cy.get('input[placeholder="Email"]').type('testuser@example.com');
        cy.get('input[placeholder="Mot de passe"]').type('password123');
        
        cy.get('button[type="submit"]').click();
        cy.wait(2000);

        cy.get('.error-message').should('contain', 'Cet email est déjà utilisé');
    });

    it('should register a new user and navigate to the login page', () => {
        cy.get('input[placeholder="Username"]').type('todelete_testuser');
        //generate random email
        cy.get('input[placeholder="Email"]').type(`todelete_test${Math.floor(Math.random() * 10000)}@mail.com`);
        cy.get('input[placeholder="Mot de passe"]').type('password123');
        
        cy.get('button[type="submit"]').click();
        
        cy.get('nav').should('be.visible');
        cy.get('h1').contains('Connexion');
    });

});