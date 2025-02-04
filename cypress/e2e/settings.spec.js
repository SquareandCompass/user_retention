import { newUser } from '../utils/index.js'
const adminUser = newUser('admin')

describe('Admin settings', function() {
	beforeEach(function() {
		cy.login(adminUser)
	})

	it('Toggle monthly_status_email settings', function() {
		cy.visit('/settings/admin')
		cy.get('#user_retention h2')
			.should('contain', 'Account retention')
		cy.get('#user_retention input#keep_users_without_login')
			.should('be.checked')
		cy.get('#user_retention label[for="keep_users_without_login"]')
			.click()
		cy.get('.toast-success').should('contain', 'Setting saved')

		cy.get('#user_retention input#user_days_disable')
			.should('have.value', '0')
		cy.get('#user_retention input#user_days_disable')
			.clear()
			.type('180{enter}')
		cy.get('.toast-success').should('contain', 'Setting saved')

		cy.get('#user_retention input#user_days')
			.should('have.value', '0')
		cy.get('#user_retention input#user_days')
			.clear()
			.type('365{enter}')
		cy.get('.toast-success').should('contain', 'Setting saved')

		cy.reload()

		cy.get('#user_retention input#keep_users_without_login')
			.should('not.be.checked')
		cy.get('#user_retention input#user_days_disable')
			.should('have.value', '180')
		cy.get('#user_retention input#user_days')
			.should('have.value', '365')
	})
})
