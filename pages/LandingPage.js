import { expect } from "@playwright/test";
import { getRandomNumber } from "../utils/testUtils";
export class LandingPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
    this.deposit_button = page.getByRole("button", { name: "Deposit" });
    this.profile_button = page.getByRole("link", { name: "Profile" });
    this.odds = page.locator(".prebet-match__odd");
    this.place_bet = page.locator("button[type='normal']");
    this.success_modal = page.locator("[class='notification show success']");
    this.share = page.getByRole("button", { name: "Share" });
    this.twitter = page.locator('a[title="Share via Twitter"]');
    this.facebook = page.locator('a[title="Share via Facebook"]');
    this.whatsapp = page.locator('a[title="Share via Whatsapp"]');
    this.copy_link = page.locator("//button[normalize-space()='Copy Link']");
    this.my_bet = page.getByRole("link", { name: "My Bets" });
    this.my_bets = page.locator('[class="my-bets-bet--id bold"]');
    this.error = page.locator('[class="notification show error"]');
  }

  async verifyUserLoggedIn(username, password) {
    await expect(await this.deposit_button).toBeVisible();
    await expect(await this.profile_button).toBeVisible();
  }

  async verifyUserNotLoggedIn() {
    await expect(await this.error).toBeVisible();
  }
  async selectThreeRandomGames() {
    const numberOfodds = await this.odds.count();
    const firstGame = getRandomNumber(1, 3);
    const secondGame = getRandomNumber(4, 6);
    const thirdGame = getRandomNumber(9, numberOfodds);
    await this.odds.nth(firstGame).click();
    await this.odds.nth(secondGame).click();
    await this.odds.nth(thirdGame).click();
  }
  async verifyBetPlace() {
    await expect(await this.success_modal).toBeVisible();
  }
  async placeBet() {
    await this.selectThreeRandomGames();
    await this.place_bet.click();
  }
  async checkLink(media, selector) {
    const [newPage] = await Promise.all([
      this.context.waitForEvent("page"),
      await selector.click(),
    ]);
    const sharedURL = await newPage.url();
    expect(sharedURL).toContain(`${media}.com`);
    await newPage.close();
  }

  async shareBet() {
    await this.share.click();
    await expect(await this.twitter).toBeVisible();
    await expect(await this.facebook).toBeVisible();
    await expect(await this.whatsapp).toBeVisible();
    await expect(await this.copy_link).toBeVisible();
    await this.checkLink("twitter", this.twitter);
    await this.checkLink("facebook", this.facebook);
    await this.checkLink("whatsapp", this.whatsapp);
  }
  async clickMyBet() {
    await this.my_bet.click();
  }
  async clickOneBet() {
    await this.clickMyBet();
    await this.my_bets.nth(0).click();
  }
}
