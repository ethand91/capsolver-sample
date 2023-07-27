const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const path = require('path');

const PATH_TO_PLUGIN = path.join(__dirname, 'extension');

(async () => {
  try {
    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extentions-except=${PATH_TO_PLUGIN}`,
        `--load-extension=${PATH_TO_PLUGIN}`
      ],
      executablePath: executablePath()
    });

    const [ page ] = await browser.pages();
    
    await page.goto('https://www.google.com/recaptcha/api2/demo');
    await page.waitForSelector('#recaptcha-anchor-label');
    await page.click('#recaptcha-anchor-label');
    console.log('done');
  } catch (error) {
    console.error('Failed to run due to the following error', error);
  }
})();
