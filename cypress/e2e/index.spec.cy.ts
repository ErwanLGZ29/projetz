describe('Index Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });

    it('should display the NavBar', () => {
        cy.get('nav').should('be.visible');
    });

    it('should display the title', () => {
      cy.get('h1').contains('Le Break Dance');
    });
  
    it('should render a card component', () => {
      cy.get('.card-container').should('be.visible');
    });
  
    it('should display image and description in the card', () => {
      cy.get('.card-container img').should('have.attr', 'src').and('include', '/hong10.png');
      cy.get('.card-description p').should('not.be.empty');
    });

    it('should display the footer', () => {
      cy.get('.footer-container').should('be.visible');
  });
  });