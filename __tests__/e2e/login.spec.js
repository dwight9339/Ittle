import { test, expect } from "@playwright/test";

test("User is taken to logged in homepage after successful login", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expect "Login" button to be on page
  const loginButton = page.locator("text=Login");
  await expect(loginButton).toHaveCount(1);

  // Expect login prompt to be shown
  await loginButton.click();
  await expect(page.locator("text=Log in to dev-2xnfgvwk to continue to Shortiezzz.")).toHaveCount(1);

  // Fill out form and login
  const usernameField = page.locator("#username");
  const passwordField = page.locator("#password");
  const continueButton = page.locator("text=/^Continue$/");

  await usernameField.type("test-user@test-domain.test");
  await passwordField.type("VzqduJxuUpM98cu");
  await continueButton.click();

  // Expect "Logout" button to be on page
  const logoutButton = page.locator("text=Logout");
  await logoutButton.waitFor();
});