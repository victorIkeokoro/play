
import { test, expect } from '@playwright/test';
import { LoginPage } from "../../pages/login";
import { LandingPage } from "../../pages/LandingPage";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { readJsonFile } from '../../utils/testUtils';


test.describe('Login functionality', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.betika.com/en-ke/');

  });
  test('login valid details test', async ({ page, context }) => {
    const jsonObject = await readJsonFile();
    const number = jsonObject.number
    const password = jsonObject.password
    const landingPage = new LandingPage(page, context);
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await loginPage.login(number, password);
    await landingPage.verifyUserLoggedIn();
  });
  test('login invalid details test', async ({ page, context }) => {
    const jsonObject = await readJsonFile();
    const number = jsonObject.invalid
    const password = jsonObject.password
    const landingPage = new LandingPage(page, context);
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await loginPage.login(number, password);
    await landingPage.verifyUserNotLoggedIn();
  });
  test('Multiple login test', async ({ page, context }) => {
    const jsonObject = await readJsonFile();
    const loginData = jsonObject.userData;
    for (const credentials of loginData) {
      const { number, password } = credentials;
      const landingPage = new LandingPage(page, context);
      const loginPage = new LoginPage(page);
      await loginPage.clickLoginLink();
      await loginPage.login(number, password);
    }
  });

  test('Registration test', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await loginPage.clickRegisterLink();
    await registrationPage.registerEmail();
    await registrationPage.verifyUserIsRegistered()
  });
  test('Betting test', async ({ page, context }) => {
    const jsonObject = await readJsonFile();
    const number = jsonObject.number
    const password = jsonObject.password
    const loginPage = new LoginPage(page);
    const landingPage = new LandingPage(page, context);
    await loginPage.clickLoginLink();
    await loginPage.login(number, password);
    await landingPage.placeBet();
    await landingPage.verifyBetPlace();
  });
  test('Share Bet test', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const landingPage = new LandingPage(page, context);
    await landingPage.selectThreeRandomGames();
    await landingPage.shareBet();
  });
  test('Rebet test', async ({ page, context }) => {
    const jsonObject = await readJsonFile();
    const number = jsonObject.number
    const password = jsonObject.password
    const loginPage = new LoginPage(page);
    const landingPage = new LandingPage(page, context);
    await loginPage.clickLoginLink();
    await loginPage.login(number, password);
    await landingPage.placeBet();
    await landingPage.clickOneBet();
  });

});
