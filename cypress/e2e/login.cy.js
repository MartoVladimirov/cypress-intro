describe('Login Page Tests', () => {
    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('http://localhost:8080/login');
    });

    it('Should show errors when submitting without entering credentials', () => {
        cy.get('[data-test-id="login-submit"]').click();

        cy.get('[data-test-id="login-email-error"]')
            .should('be.visible')
            .and('have.text', 'Enter a valid email address');

        cy.get('[data-test-id="login-password-error"]')
            .should('be.visible')
            .and('have.text', 'Enter your password');
    });

    it('Should show error for invalid email format', () => {
        cy.get('[data-test-id="login-email"]').type('invalid-email');
        cy.get('[data-test-id="login-submit"]').click();

        cy.get('[data-test-id="login-email-error"]')
            .should('be.visible')
            .and('have.text', 'Enter a valid email address');
    });

    it('Should show error for short password', () => {
        cy.get('[data-test-id="login-email"]').type('test@example.com');
        cy.get('[data-test-id="login-password"]').type('123');
        cy.get('[data-test-id="login-submit"]').click();

        cy.get('[data-test-id="login-password-error"]')
            .should('be.visible')
            .and('have.text', 'Password is too short (min 8 characters)');
    });

    it('Should allow login with valid credentials', () => {
        cy.get('[data-test-id="login-email"]').type('test@example.com');
        cy.get('[data-test-id="login-password"]').type('validPass123');
        cy.get('[data-test-id="login-submit"]').click();

        // Check if redirected to the dashboard or success page
        cy.url().should('include', '/dashboard.html');
    });
});