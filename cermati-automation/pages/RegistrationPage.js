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
        await this.driver.findElement(By.css('[type="checkbox"]')).click();
    }

    async waitForPinInput() {
        await this.driver.wait(until.elementLocated(By.id('pin-input-0')), 1000);
    }
    
}

module.exports = RegistrationPage;
