import {
  generateNumber,
  readJsonFile,
  writeJsonFile,
} from "../utils/testUtils";
import { expect } from "@playwright/test";
export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.usename_text_box = page.locator('input[type="text"]');
    this.password_text_box = page.locator('input[type="password"]');
    this.register_button = page.getByRole("button", { name: "Register" });
    this.check_box = page.locator(".checkmark");
    this.registration_success = page.locator(
      "[class='notification show success'] div",
    );
  }

  async fillRegistrationDetails(number, password) {
    await this.usename_text_box.fill(number);
    await this.usename_text_box.clear();
    await this.usename_text_box.fill(number);
    await this.password_text_box.nth(0).fill(password);
    await this.password_text_box.nth(1).fill(password);
  }
  async clickRegisterButton() {
    await this.register_button.click();
  }
  async clickCheckBox() {
    await this.check_box.click();
  }
  async verifyUserIsRegistered() {
    await expect(this.registration_success).toBeVisible();
  }

  async registerEmail() {
    const random_number = await generateNumber(12);
    const random_password = await generateNumber(12);
    const jsonObject = await readJsonFile();
    await this.fillRegistrationDetails(random_number, random_password);
    await this.clickCheckBox();
    await this.clickRegisterButton();
    await this.verifyUserIsRegistered();
    const newData = {
      number: random_number,
      password: random_password,
    };
    jsonObject.userData.push(newData);
    await writeJsonFile(jsonObject);
  }
}
