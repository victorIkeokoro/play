
import { test, expect } from '@playwright/test';
import {LoginPage} from "../../pages/login"
test('test', async ({ page }) => {
  const Login =new LoginPage(page)
  await page.goto('/');
  await Login.login("tomsmith","SuperSecretPassword!")

});