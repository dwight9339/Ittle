const { firefox } = require("playwright");

const loginTestUser = async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  let sessionCode;
  page.on("response", async (response) => {
    const rawCookieData = await response.headerValue("set-cookie");
    if (rawCookieData) {
      const sessionCodeStart = rawCookieData.indexOf("appSession=");
      if (sessionCodeStart !== -1) {
        const sessionCodeEnd = rawCookieData.indexOf(";", sessionCodeStart);
        sessionCode = rawCookieData.substring(sessionCodeStart, sessionCodeEnd);
      }
    }
  });
  await page.goto("http://localhost:3000");
  const loginButton = page.locator("text=Login");
  await loginButton.click();

  // Fill out form and login
  const usernameField = page.locator("#username");
  const passwordField = page.locator("#password");
  const continueButton = page.locator("text=/^Continue$/");

  await usernameField.type("test-user@test-domain.test");
  await passwordField.type("VzqduJxuUpM98cu");
  await continueButton.click();
  await browser.close();

  return sessionCode;
}

export default loginTestUser;