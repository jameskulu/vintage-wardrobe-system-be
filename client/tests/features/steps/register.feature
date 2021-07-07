const { expect } = require('chai');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { Builder, By, Key, until, sleep } = require('selenium-webdriver');
const { delay } = require('../utils/constant');

Given('Test registration functionality', { timeout: 30000 }, async function () {
    let driver = await new Builder().forBrowser('firefox').build();
    await driver.get('http://localhost:3000/register'); await driver.findElement(By.id('fullName')).sendKeys('Rijan Shrestha');
    await driver.findElement(By.id('phoneInput')).sendKeys('9800000002');

    await driver.sleep(delay);

    await driver.findElement(By.id('passwordInput')).sendKeys('rijan12');
    await driver.findElement(By.id('cPasswordInput')).sendKeys('rijan12');
    await driver.findElement(By.id('registerBtn')).click();

    await driver.wait(until.elementLocated(By.id("loggedInUser")), 30000);
    expect(await driver.findElement(By.id('loggedInUser')).getText()).to.be.equal("Rijan Shrestha");
    await driver.quit();
});