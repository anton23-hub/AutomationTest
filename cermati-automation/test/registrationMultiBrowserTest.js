require('dotenv').config();
const { expect } = require('chai');
const { createDriver } = require('../utils/driverFactory');
const RegistrationPage = require('../pages/RegistrationPage');

const browsers = ['chrome', 'firefox']; // Add or remove browsers here

browsers.forEach((browser) => {
  describe(`Cermati Registration — Positive Flow on ${browser}`, function () {
    this.timeout(60000);
    let driver, regPage;

    before(async () => {
      driver = await createDriver(browser);
      regPage = new RegistrationPage(driver);
    });

    it('input the OTP after success input data', async function () {
      await regPage.open();
      await regPage.fillMobile(process.env.TEST_MOBILE);
      await regPage.fillEmail(process.env.TEST_EMAIL);
      await regPage.fillFirstName(process.env.TEST_FIRSTNAME);
      await regPage.fillLastName(process.env.TEST_LASTNAME);
      await regPage.submit();

      await driver.sleep(3000);
      await regPage.acceptTermsIfPresent();
      
      // Wait 3 seconds to ensure OTP input appears
      await driver.sleep(3000);
      // Mock OTP entry (replace with real OTP handling if available)
      await regPage.enterOtpMock('123456');
    });

    after(async function () {
      await driver.sleep(3000); // ✅ Wait before closing
      if (driver) {
        await driver.quit();
      }
    });

    // await regPage.waitForPinInput();
    // const pinElement = await driver.findElement({ id: 'pin-input-0' });
    // expect(await pinElement.isDisplayed()).to.be.true;
    
  });
});
