require('dotenv').config();
const { expect } = require('chai');
const { By } = require('selenium-webdriver');
const { createDriver } = require('../utils/driverFactory');
const RegistrationPage = require('../pages/RegistrationPage');

describe('Cermati Registration Page', function () {
    this.timeout(50000);
    let driver, regPage;

    before(async () => {
        driver = await createDriver('chrome');
        regPage = new RegistrationPage(driver);
    });

    it('should fill registration form and display PIN input', async () => {
        await regPage.open();

        await regPage.fillMobile(process.env.TEST_MOBILE);
        await regPage.fillEmail(process.env.TEST_EMAIL);
        await regPage.fillFirstName(process.env.TEST_FIRSTNAME);
        await regPage.fillLastName(process.env.TEST_LASTNAME);
        await regPage.submit();
        await regPage.acceptTerms();

        // input OTP manual before 10 sec
        await driver.sleep(10000);
        const pinField = await driver.findElement(By.id('pin-input-0'));
        expect(await pinField.isDisplayed()).to.be.true;
        await regPage.waitForPinInput();
    });

    after(async () => {
        // wait 5 seconds before closing browser
        await driver.sleep(10000);
        await driver.quit();
    });
    
});
