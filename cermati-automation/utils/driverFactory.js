const { Builder } = require('selenium-webdriver');
require('chromedriver'); //chrome browser
require('geckodriver'); //firefox browser

async function createDriver(browser = 'chrome') {
  return await new Builder().forBrowser(browser).build();
}

module.exports = { createDriver };
