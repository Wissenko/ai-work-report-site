const { expect } = require("@playwright/test");

const publicRoutes = [
  { path: "/index.html", label: "Home" },
  { path: "/what-you-get.html", label: "What You Get" },
  { path: "/samples.html", label: "Sample AI Work Plan" },
  { path: "/how-it-works.html", label: "How It Works" },
  { path: "/faq.html", label: "FAQ" },
  { path: "/privacy.html", label: "Privacy" },
  { path: "/methodology.html", label: "Methodology" },
  { path: "/samples/admin-assistant/", label: "Representative Sample" },
  { path: "/roles/ai-for-administrative-assistants/", label: "Administrative Assistant Role Page" }
];

const coreA11yRoutes = [
  "/index.html",
  "/samples.html",
  "/samples/admin-assistant/",
  "/faq.html"
];

const visualRoutes = [
  { path: "/index.html", name: "home" },
  { path: "/samples.html", name: "sample-hub" },
  { path: "/samples/admin-assistant/", name: "admin-sample-report" },
  { path: "/faq.html", name: "faq" }
];

const visualViewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 900 }
];

async function prepareStablePage(page) {
  await page.route("https://fonts.gstatic.com/**", (route) => route.fulfill({ status: 204, body: "" }));
  await page.route("https://fonts.googleapis.com/**", (route) => route.fulfill({ status: 204, body: "" }));
  await page.route("**/_vercel/**", (route) => route.fulfill({ status: 204, body: "" }));
}

async function addStableVisualStyles(page) {
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
      }
    `
  });
}

async function expectHealthyPage(page) {
  await expect(page.locator("body")).toContainText("Your AI Work Plan");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".site-header")).toBeVisible();
}

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => {
    const documentWidth = document.documentElement.scrollWidth;
    const viewportWidth = document.documentElement.clientWidth;
    return Math.max(0, documentWidth - viewportWidth);
  });
  expect(overflow).toBeLessThanOrEqual(2);
}

module.exports = {
  publicRoutes,
  coreA11yRoutes,
  visualRoutes,
  visualViewports,
  prepareStablePage,
  addStableVisualStyles,
  expectHealthyPage,
  expectNoHorizontalOverflow
};
