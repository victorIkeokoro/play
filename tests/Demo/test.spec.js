import { test } from "@playwright/test";
import { LoginPage } from "../../pages/login";
import { LandingPage } from "../../pages/LandingPage";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { MyBetPage } from "../../pages/MyBetPage";
import { readJsonFile } from "../../utils/testUtils";

test.describe("Login functionality", () => {
  let page, context;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://www.betika.com/en-ke/");
  });

  test.afterEach(async () => {
    await page.close();
  });

  const performLogin = async (page, number, password) => {
    const landingPage = new LandingPage(page, context);
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await loginPage.login(number, password);
    return landingPage;
  };

  test("login valid details test", async () => {
    const { number, password } = await readJsonFile();
    const landingPage = await performLogin(page, number, password);
    await landingPage.verifyUserLoggedIn();
  });

  test("login invalid details test", async () => {
    const { invalid, password } = await readJsonFile();
    const landingPage = await performLogin(page, invalid, password);
    await landingPage.verifyUserNotLoggedIn();
  });

  test("Multiple login test", async () => {
    const { userData } = await readJsonFile();
    for (const credentials of userData) {
      const { number, password } = credentials;
      await performLogin(page, number, password);
    }
  });

  test("Registration test", async () => {
    const registrationPage = new RegistrationPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await loginPage.clickRegisterLink();
    await registrationPage.registerEmail();
    await registrationPage.verifyUserIsRegistered();
  });

  test("Betting test", async () => {
    const { number, password } = await readJsonFile();
    const landingPage = await performLogin(page, number, password);
    await landingPage.placeBet();
    await landingPage.verifyBetPlace();
  });

  test("Share Bet test", async () => {
    const landingPage = new LandingPage(page, context);
    await landingPage.selectThreeRandomGames();
    await landingPage.shareBet();
  });

  test("Rebet test", async () => {
    const { number, password } = await readJsonFile();
    const landingPage = await performLogin(page, number, password);
    const myBetPage = new MyBetPage(page);
    await landingPage.placeBet();
    await landingPage.clickOneBet();
    await myBetPage.clickRebet();
    await myBetPage.clickContinue();
    await myBetPage.verifySuccessModal();
  });
  test("Request cashout test", async () => {
    const { number, password } = await readJsonFile();
    const landingPage = await performLogin(page, number, password);
    const myBetPage = new MyBetPage(page);
    await landingPage.placeBet();
    await landingPage.clickOneBet();
    await myBetPage.click_request_cashout();
    await myBetPage.click_cashout();
    await myBetPage.clickContinue();
    await myBetPage.click_cashout();
    await myBetPage.verifySuccessModal();
  });
  test("Cancel bet test", async () => {
    const { number, password } = await readJsonFile();
    const landingPage = await performLogin(page, number, password);
    const myBetPage = new MyBetPage(page);
    await landingPage.placeBet();
    await landingPage.clickOneBet();
    await myBetPage.click_cancel();
    await myBetPage.clickContinue();
    await myBetPage.verifySuccessModal();
  });
});
