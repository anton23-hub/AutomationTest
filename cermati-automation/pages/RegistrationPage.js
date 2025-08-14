const { By, until } = require('selenium-webdriver');

class RegistrationPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://www.cermati.com/app/gabung';
  }

  async open() {
    await this.driver.get(this.url);
  }

  async fillMobile(mobile) {
    const el = await this.driver.wait(until.elementLocated(By.id('mobilePhone')), 10000);
    await el.sendKeys(mobile);
  }

  async fillEmail(email) {
    const el = await this.driver.wait(until.elementLocated(By.id('email')), 10000);
    await el.sendKeys(email);
  }

  async fillFirstName(name) {
    const el = await this.driver.wait(until.elementLocated(By.id('firstName')), 10000);
    await el.sendKeys(name);
  }

  async fillLastName(name) {
    const el = await this.driver.wait(until.elementLocated(By.id('lastName')), 10000);
    await el.sendKeys(name);
  }

  async submit() {
    await this.driver.findElement(By.css('button[data-button-name="register-new"]')).click();
}

  async acceptTermsIfPresent() {
        try {
            // Wait up to 3 seconds for the checkbox after submit
            const checkbox = await this.driver.wait(
                until.elementLocated(By.css('[type="checkbox"]')),
                5000
            );
            await checkbox.click();
            console.log('Accept Terms checkbox clicked.');
        } catch (err) {
            console.log('Accept Terms checkbox not found after submit, skipping...');
        }
    }

    async enterOtpMock(otp = '123456') {
        try {
            for (let i = 0; i < otp.length; i++) {
                const pinInput = await this.driver.wait(
                    until.elementLocated(By.id(`pin-input-${i}`)),
                    5000
                );
                await pinInput.sendKeys(otp[i]);
            }
            console.log(`Entered OTP: ${otp}`);
        } catch (err) {
            console.error("Failed to enter OTP:", err);
            throw err;
        }
    }

//   async waitForPinInput() {
//     await this.driver.wait(until.elementLocated(By.id('pin-input-0')), 10000);
//   }
}

module.exports = RegistrationPage;