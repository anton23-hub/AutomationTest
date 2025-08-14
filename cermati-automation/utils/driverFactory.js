require('chromedriver'); // Chrome driver
require('geckodriver');  // Firefox driver
const { Builder } = require('selenium-webdriver');
require('dotenv').config();

async function createDriver() {
  const browser = (process.env.BROWSER || 'chrome').toLowerCase();

  let driverBuilder = new Builder().forBrowser(browser);

  switch (browser) {
    case 'chrome':
      driverBuilder = driverBuilder.setChromeOptions();
      break;
    case 'firefox':
      driverBuilder = driverBuilder.setFirefoxOptions();
      break;
    default:
      throw new Error(`Unsupported browser: ${browser}`);
  }

  return await driverBuilder.build();
}

module.exports = { createDriver };
