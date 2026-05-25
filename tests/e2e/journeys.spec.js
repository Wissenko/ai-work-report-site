const { test, expect } = require("@playwright/test");

test.describe("high-value public journeys", () => {
  test("homepage primary CTA jumps to pricing", async ({ page }) => {
    await page.goto("/index.html");

    await page.locator(".hero").getByRole("link", { name: "Get my AI Work Plan — $9.99" }).click();

    await expect(page.locator("#pricing")).toBeInViewport();
  });

  test("desktop navigation reaches the sample page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/index.html");

    await page.locator(".nav-links").getByRole("link", { name: "Sample Report" }).click();

    await expect(page).toHaveURL(/\/samples\.html$/);
    await expect(page.getByRole("heading", { name: "See what your AI Work Plan can look like." })).toBeVisible();
  });

  test("mobile menu opens and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto("/index.html");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(".nav-shell")).toHaveAttribute("data-open", "true");

    await page.locator(".nav-links").getByRole("link", { name: "Sample Report" }).click();

    await expect(page).toHaveURL(/\/samples\.html$/);
    await expect(page.getByRole("heading", { name: "See what your AI Work Plan can look like." })).toBeVisible();
  });

  test("sample hub routes to the representative sample report", async ({ page }) => {
    await page.goto("/samples.html");

    await page.getByRole("link", { name: "See the sample report" }).click();

    await expect(page).toHaveURL(/\/samples\/admin-assistant\/$/);
    await expect(page.getByRole("heading", {
      name: "Sample AI Work Plan: Administrative / Executive Assistant"
    })).toBeVisible();
  });

  test("FAQ rows expand and collapse", async ({ page }) => {
    await page.goto("/faq.html");

    const faqItem = page.locator(".faq-item").filter({ hasText: "When do I pay?" });
    await expect(faqItem).not.toHaveAttribute("open", "");

    await faqItem.locator("summary").click();
    await expect(faqItem).toHaveAttribute("open", "");
    await expect(faqItem).toContainText("You pay after the interview");

    await faqItem.locator("summary").click();
    await expect(faqItem).not.toHaveAttribute("open", "");
  });

  test("simplified role page routes to the representative sample report", async ({ page }) => {
    await page.goto("/roles/ai-for-administrative-assistants/");

    await page.getByRole("link", { name: "See the sample report", exact: true }).click();

    await expect(page).toHaveURL(/\/samples\/admin-assistant\/$/);
    await expect(page.getByRole("heading", {
      name: "Sample AI Work Plan: Administrative / Executive Assistant"
    })).toBeVisible();
  });
});
