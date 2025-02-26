import PasswordPage from "../page-objects/password";

describe('Common website elements', () => {
    const passwordPage = new PasswordPage();
    const passwords = {
        shortPassword: {
            value: 'abc',
            validatorsActive: ['lenghtValidator', 'uppercaseValidator', 'specialValidator'],
            validatorsNonActive: ['lowercaseValidator'],
        },
        specialCharPassword: {
            value: 'abc!',
            validatorsActive: ['lenghtValidator', 'uppercaseValidator'],
            validatorsNonActive: ['lowercaseValidator', 'specialValidator'],
        },
        upperCasePassword: {
            value: 'ABC',
            validatorsActive: ['lenghtValidator', 'lowercaseValidator', 'specialValidator'],
            validatorsNonActive: ['uppercaseValidator'],
        },
        correctPassword: {
            value: 'Abcdefgh!',
            validatorsActive: [],
            validatorsNonActive: ['uppercaseValidator', 'lenghtValidator', 'lowercaseValidator', 'specialValidator'],
        }
    };

    before('Visit Website', () => {
        cy.visit('https://practice.expandtesting.com/secure-password-checker');
    });

    it('Password validator', () => {
        const passwordKeys = Object.keys(passwords);

        for (let i = 0; i < passwordKeys.length; i++) {
            const key = passwordKeys[i];
            const { value, validatorsActive, validatorsNonActive } = passwords[key];

            passwordPage.passwordField.clear().type(value);

            for (let j = 0; j < validatorsActive.length; j++) {
                passwordPage[validatorsActive[j]].should('be.visible');
            }

            for (let j = 0; j < validatorsNonActive.length; j++) {
                passwordPage[validatorsNonActive[j]].should('not.be.visible');
            }
        }
    });
});
