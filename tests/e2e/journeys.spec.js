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

  test("growth CTA clicks include deterministic CTA IDs", async ({ page }) => {
    await page.route("**/posthog-config.js", (route) => route.fulfill({
      contentType: "application/javascript",
      body: `
        window.__GROWTH_POSTHOG_CONFIG__ = {
          projectToken: "test-token",
          host: "https://posthog.test"
        };
      `
    }));
    await page.route("https://posthog.test/static/array.js", (route) => route.fulfill({
      contentType: "application/javascript",
      body: `
        window.__capturedGrowthEvents = [];
        window.posthog = {
          init: function () {},
          register: function () {},
          capture: function (eventName, properties) {
            window.__capturedGrowthEvents.push({ eventName, properties });
          }
        };
      `
    }));

    await page.goto("/index.html");
    await page.locator(".hero").getByRole("link", { name: "Get my AI Work Plan — $9.99" }).click();

    const ctaEvent = await page.waitForFunction(() =>
      window.__capturedGrowthEvents?.find((event) => event.eventName === "growth_cta_clicked")
    );
    const eventPayload = await ctaEvent.jsonValue();

    expect(eventPayload.properties).toMatchObject({
      cta_event: "static_site_cta_click",
      cta_id: "aiwr:home:body:pricing:get-my-ai-work-plan-9-99",
      cta_href: "#pricing",
      cta_surface: "body",
      page_type: "homepage",
      source_asset_id: "aiwr:home",
      site_id: "ai-work-report-site",
      venture_id: "ai-work-report"
    });
  });

  test("homepage role router exposes role metadata", async ({ page }) => {
    await page.goto("/index.html");

    const officeManagerLink = page.getByRole("link", { name: "See the office manager sample" });
    await expect(officeManagerLink).toHaveAttribute("href", "./samples/office-manager/");
    await expect(officeManagerLink).toHaveAttribute("data-role-slug", "office-manager");
    await expect(officeManagerLink).toHaveAttribute("data-destination-type", "sample_report");
  });
});
