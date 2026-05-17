const { test, expect } = require("@playwright/test");
const { publicRoutes, expectHealthyPage, expectNoHorizontalOverflow } = require("./helpers");

test.describe("public route smoke checks", () => {
  for (const route of publicRoutes) {
    test(`${route.label} loads`, async ({ page }) => {
      const consoleMessages = [];
      page.on("console", (message) => {
        if (["error", "warning"].includes(message.type())) consoleMessages.push(message.text());
      });
      page.on("pageerror", (error) => consoleMessages.push(error.message));

      await page.goto(route.path);
      await expectHealthyPage(page);
      await expectNoHorizontalOverflow(page);
      await expect(page).toHaveTitle(/Your AI Work Plan|Sample AI Work Plan|AI for|Privacy|FAQ|Methodology/);
      expect(consoleMessages).toEqual([]);
    });
  }

  test("homepage has the main conversion target", async ({ page }) => {
    await page.goto("/index.html");
    await expect(page.getByRole("heading", {
      name: "Don’t be the person at work still doing everything by hand."
    })).toBeVisible();
    await expect(page.locator("#pricing")).toBeVisible();
    await expect(page.getByRole("link", { name: "See sample report", exact: true })).toBeVisible();
  });
});
