# QA Standard

Use this standard for future Codex work in this repo.

## Required Checks

Before completing UI work, run the relevant reliable checks:

- `npm run lint` for static route, metadata, anchor, and internal-link checks.
- `npm run test:e2e` for Playwright smoke, journey, accessibility, and visual regression tests.
- `npm run qa` for the normal repeatable QA pass.
- `npm run qa:full` when Lighthouse CI is practical for the change.
- Run lint, typecheck, unit tests, and Playwright tests before completing UI work whenever those scripts exist. This static site currently has lint and Playwright coverage; typecheck and unit tests are not applicable until the repo adds TypeScript or unit-testable modules.

Only update Playwright snapshots with `npm run test:e2e:update` when the visual change is intentional. Do not update snapshots blindly.

## Layout Coverage

Check these viewport classes for UI changes:

- Desktop: 1440px wide.
- Tablet: 768px wide.
- Mobile: 375px wide.

Watch for clipped text, overlapping cards, broken sticky headers, cramped buttons, horizontal scrolling, table overflow, and report sections that become unreadable.

## State Coverage

For each touched flow, check the states that exist in this static site:

- Loading: page loads without framework overlays or console errors.
- Empty: pages without forms or private data still show useful content.
- Error: broken internal links and missing anchors are treated as errors.
- Success: primary journeys land on the expected page or section.

If future forms, checkout, report generation, login, or dashboard states are added, test loading, empty, error, and success states for those flows too.

## Interaction Coverage

Prioritize these journeys:

- Homepage primary CTA to the pricing section.
- Desktop navigation to key pages.
- Mobile menu open, close, and navigation.
- Sample hub to role sample report.
- Role guide to matching sample report.
- FAQ expand and collapse behavior.
- Pricing CTA and any checkout handoff if it becomes a real flow.

## Accessibility Checklist

Automated axe checks are required for important public routes. Manual checks should include:

- Keyboard navigation reaches nav links, CTAs, FAQ controls, and footer links.
- Visible focus states are clear and not clipped.
- Form fields have labels, if forms are introduced.
- Error messages are tied to fields, if forms are introduced.
- Pages keep one clear H1 and a sensible heading order.
- Link and button text describes the destination or action.
- Color contrast is readable for body text, muted text, buttons, and focus outlines.
- Tables and horizontally scrolling report sections remain usable on mobile.

## Reporting

Report UX, visual, and accessibility issues by severity:

- P0: blocks purchase, navigation, or page access.
- P1: major mobile/desktop breakage, inaccessible primary action, broken key journey.
- P2: noticeable UX or accessibility issue with a workaround.
- P3: polish, copy, or visual refinement.

Fix obvious P0/P1 issues during the QA setup or task. Leave subjective design improvements as recommendations unless the user asked for redesign work.
