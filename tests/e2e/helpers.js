const { expect } = require("@playwright/test");

const publicRoutes = [
  { path: "/index.html", label: "Home" },
  { path: "/what-you-get.html", label: "What You Get" },
  { path: "/samples.html", label: "Sample AI Work Plans" },
  { path: "/roles/", label: "Role Guides" },
  { path: "/how-it-works.html", label: "How It Works" },
  { path: "/faq.html", label: "FAQ" },
  { path: "/privacy.html", label: "Privacy" },
  { path: "/methodology.html", label: "Methodology" },
  { path: "/samples/admin-assistant/", label: "Administrative Assistant Sample" },
  { path: "/samples/office-manager/", label: "Office Manager Sample" },
  { path: "/samples/customer-support/", label: "Customer Support Sample" },
  { path: "/samples/finance-accounting/", label: "Finance Sample" },
  { path: "/samples/hr-coordinator/", label: "HR Sample" },
  { path: "/samples/sales-coordinator/", label: "Sales Sample" },
  { path: "/samples/operations-coordinator/", label: "Operations Sample" },
  { path: "/samples/junior-analyst/", label: "Junior Analyst Sample" },
  { path: "/roles/ai-for-administrative-assistants/", label: "Administrative Assistant Guide" },
  { path: "/roles/ai-for-office-managers/", label: "Office Manager Guide" },
  { path: "/roles/ai-for-customer-support-reps/", label: "Customer Support Guide" },
  { path: "/roles/ai-for-finance-accounting-associates/", label: "Finance Guide" },
  { path: "/roles/ai-for-hr-coordinators/", label: "HR Guide" },
  { path: "/roles/ai-for-sales-coordinators/", label: "Sales Guide" },
  { path: "/roles/ai-for-operations-coordinators/", label: "Operations Guide" },
  { path: "/roles/ai-for-junior-analysts/", label: "Junior Analyst Guide" }
];

const coreA11yRoutes = [
  "/index.html",
  "/samples.html",
  "/samples/admin-assistant/",
  "/roles/ai-for-administrative-assistants/",
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
  await page.route("https://fonts.gstatic.com/**", (route) => route.abort());
  await page.route("https://fonts.googleapis.com/**", (route) => route.abort());
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
