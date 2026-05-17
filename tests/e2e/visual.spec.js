const { test, expect } = require("@playwright/test");
const {
  visualRoutes,
  visualViewports,
  prepareStablePage,
  addStableVisualStyles,
  expectHealthyPage,
  expectNoHorizontalOverflow
} = require("./helpers");

test.describe("visual regression", () => {
  for (const viewport of visualViewports) {
    for (const route of visualRoutes) {
      test(`${route.name} at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await prepareStablePage(page);
        await page.goto(route.path);
        await addStableVisualStyles(page);
        await expectHealthyPage(page);
        await expectNoHorizontalOverflow(page);

        await expect(page).toHaveScreenshot(`${route.name}-${viewport.name}.png`, {
          fullPage: true,
          animations: "disabled",
          caret: "hide"
        });
      });
    }
  }
});
