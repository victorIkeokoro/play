import { expect } from "@playwright/test";
export class MyBetPage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
    this.rebet = page.getByRole("button", { name: "Rebet" });
    this.request_cashout = page.getByRole("button", {
      name: "Request Cashout",
    });
    this.continue = page.getByText("Continue");
    this.cashout = page.locator(".cashout-bet-detail div");
    this.confirm_cashout = page.locator(".confirm-dialogue__ok-btn");
    this.cancel = page.getByRole("button", { name: "Cancel" });
    this.success_modal = page.locator("[class='notification show success']");
  }

  async clickRebet() {
    await this.rebet.click();
  }
  async clickContinue() {
    await this.continue.click();
  }
  async verifySuccessModal() {
    await expect(await this.success_modal).toBeVisible();
  }
  async click_request_cashout() {
    await this.request_cashout.click();
  }
  async click_cashout() {
    await this.cashout.click();
  }
  async click_confirm_cashout() {
    await this.confirm_cashout.click();
  }
  async click_cancel() {
    await this.cancel.click();
  }
}
