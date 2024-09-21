describe('Competitions Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/competitions');
    });

    it('should display the NavBar', () => {
        cy.get('nav').should('be.visible');
    });

    it('should display the title', () => {
      cy.get('h1').contains('Les Compétitions');
    });
  
    it('should render a competitions card component', () => {
      cy.get('.card-container').should('be.visible');
    });
  
    it('should display image and informations in the card', () => {
      cy.get('.card-container img').should('have.attr', 'src').and('include', '/bcone.jpg');
      cy.get('.card-informations p').should('not.be.empty');
    });

    it('should display the footer', () => {
      cy.get('.footer-container').should('be.visible');
  });
  });