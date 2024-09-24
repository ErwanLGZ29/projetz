describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('should display the NavBar', () => {
        cy.get('nav').should('be.visible');
    });

    it('should display the login form', () => {
        cy.contains('h1', 'Connexion').should('be.visible');
    
        cy.get('input[placeholder="Email"]').should('be.visible');
        cy.get('input[placeholder="Mot de passe"]').should('be.visible');
        
        cy.get('button[type="submit"]').contains('Connexion').should('be.visible');
    
        cy.get('a').contains('Ou inscrivez-vous').should('have.attr', 'href', '/register');
      });

    it('should display the footer', () => {
        cy.get('.footer-container').should('be.visible');
    });

    it('should show validation errors for empty fields', () => {
        cy.get('button[type="submit"]').click();
        
        cy.get('input[placeholder="Email"]:invalid').should('exist');
        cy.get('input[placeholder="Mot de passe"]:invalid').should('exist');
    });

    it('should show error for invalid email format', () => {
        cy.get('input[placeholder="Email"]').type('invalid-email');
        cy.get('input[placeholder="Mot de passe"]').type('password123');
        
        cy.get('button[type="submit"]').click();
        
        cy.get('input[placeholder="Email"]:invalid').should('exist');
    });

    it('should show error message for invalid credentials', () => {
        cy.get('input[placeholder="Email"]').type('invaliduser@example.com');
        cy.get('input[placeholder="Mot de passe"]').type('wrongpassword');
        
        
        cy.get('button[type="submit"]').click();
    
        cy.get('.error-message').should('contain', 'Email ou mot de passe incorrect');
      });

      it('should successfully login with valid credentials', () => {
        cy.get('input[placeholder="Email"]').type('testuser@example.com');
        cy.get('input[placeholder="Mot de passe"]').type('password123');
        
        cy.get('button[type="submit"]').click();
        
        cy.url().should('include', '/');
      });
});