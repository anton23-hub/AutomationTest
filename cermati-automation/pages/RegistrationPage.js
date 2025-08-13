const { By, until } = require('selenium-webdriver');

class RegistrationPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://www.cermati.com/app/gabung';
    }

    async open() {
        await this.driver.get(this.url);
    }

    async fillEmail(email) {
        await this.driver.findElement(By.id('email')).sendKeys(email);
    }

    async fillMobile(mobile) {
        await this.driver.findElement(By.id('mobilePhone')).sendKeys(mobile);
    }

    async fillFirstName(name) {
        await this.driver.findElement(By.id('firstName')).sendKeys(name);
    }

    async fillLastName(name) {
        await this.driver.findElement(By.id('lastName')).sendKeys(name);
    }

    async submit() {
        await this.driver.findElement(By.css('button[data-button-name="register-new"]')).click();
    }

    async acceptTerms() {
        try {
            // Switch to the reCAPTCHA iframe
            await this.driver.wait(until.ableToSwitchToFrame(
                this.driver.findElement(By.css('iframe[src*="recaptcha"]'))
            ), 5000);
    
            // Wait for the checkbox element
            const recaptchaCheckbox = await this.driver.wait(
                until.elementLocated(By.id('recaptcha-anchor')),
                5000
            );
    
            // Click the checkbox
            await recaptchaCheckbox.click();
            console.log('reCAPTCHA checkbox clicked.');
    
            // Switch back to the main page
            await this.driver.switchTo().defaultContent();
        } catch (err) {
            console.log('reCAPTCHA checkbox not found or not clickable:', err.message);
        }
    }

    async waitForPinInput() {
        await this.driver.wait(until.elementLocated(By.id('pin-input-0')), 1000);
    }
    
}

module.exports = RegistrationPage;