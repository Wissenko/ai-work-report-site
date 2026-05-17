import { mkdir, readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://youraiworkplan.com";
const today = "2026-05-17";

const roles = [
  {
    title: "Administrative / Executive Assistant",
    shortTitle: "Administrative Assistant",
    guideSlug: "ai-for-administrative-assistants",
    sampleSlug: "admin-assistant",
    sampleTitle: "Sample AI Work Plan: Administrative / Executive Assistant",
    sampleDescription:
      "See a sample AI Work Plan for an Administrative or Executive Assistant, including a work map, first AI test, prompts, review cautions, and a 7-day plan.",
    guideTitle: "AI for Administrative Assistants: What to Try First",
    guideDescription:
      "Learn how administrative and executive assistants can use AI for follow-up lists, meeting notes, reminders, and internal drafts while keeping priorities and final messages in their hands.",
    h1: "AI for Administrative Assistants: What to Try First, What to Check, and What Not to Hand Over",
    introRole: "administrative assistant",
    firstTest: "Turn rough daily notes into a clean follow-up list.",
    useCases: [
      "Meeting notes to action items",
      "Daily follow-up lists",
      "Routine internal reminders",
      "Office document cleanup",
      "Scheduling message drafts",
    ],
    checks: ["Deadlines", "Tone", "Names", "Promises", "Sensitive details", "Final send"],
    boundaries: [
      "External messages",
      "Private employee or customer details",
      "Scheduling decisions",
      "Company promises",
    ],
    prompt:
      "Turn these safe internal notes into a follow-up table. Do not invent deadlines, names, owners, or commitments. If something is unclear, mark it as “check first.” Create columns for person or role, request, deadline, next step, draft message, and what I should verify.",
    sampleCta: "See the Administrative Assistant sample report",
    related: ["office-manager", "operations-coordinator"],
  },
  {
    title: "Office Manager",
    shortTitle: "Office Manager",
    guideSlug: "ai-for-office-managers",
    sampleSlug: "office-manager",
    sampleTitle: "Sample AI Work Plan: Office Manager",
    sampleDescription:
      "See a sample AI Work Plan for an Office Manager, including office request tracking, vendor follow-ups, prompt templates, and a 7-day test plan.",
    guideTitle: "AI for Office Managers: What to Try First",
    guideDescription:
      "Learn how office managers can use AI for request tracking, vendor follow-ups, announcements, and logistics while keeping spending, commitments, and sensitive details under review.",
    h1: "AI for Office Managers: What to Try First, What to Check, and What Not to Hand Over",
    introRole: "office manager",
    firstTest: "Turn scattered office requests and vendor notes into a weekly issue tracker.",
    useCases: [
      "Weekly office issue tracker",
      "Vendor follow-up drafts",
      "Office announcement cleanup",
      "Event logistics checklists",
      "Facilities repair summaries",
    ],
    checks: ["Urgency", "Vendor commitments", "Spending", "Status", "Employee-sensitive details"],
    boundaries: ["Purchase approvals", "Access details", "Private employee concerns", "Vendor promises"],
    prompt:
      "Turn these safe office request notes into a weekly issue tracker. Do not mark anything as approved unless I wrote approved. If a date, owner, or status is unclear, mark it as “check first.” Create columns for request, source, owner, status, next step, due date, and what I should verify.",
    sampleCta: "See the Office Manager sample report",
    related: ["admin-assistant", "operations-coordinator"],
  },
  {
    title: "Customer Support Representative",
    shortTitle: "Customer Support Rep",
    guideSlug: "ai-for-customer-support-reps",
    sampleSlug: "customer-support",
    sampleTitle: "Sample AI Work Plan: Customer Support Representative",
    sampleDescription:
      "See a sample AI Work Plan for a Customer Support Representative, including ticket replies, escalation summaries, prompts, and review rules.",
    guideTitle: "AI for Customer Support Reps: What to Try First",
    guideDescription:
      "Learn how customer support representatives can use AI for ticket summaries, reply drafts, escalation notes, and tone checks without handing over policy decisions or final send.",
    h1: "AI for Customer Support Reps: What to Try First, What to Check, and What Not to Hand Over",
    introRole: "customer support representative",
    firstTest: "Turn a messy customer ticket thread into a clear reply draft and escalation summary.",
    useCases: [
      "Ticket thread summaries",
      "Customer reply drafts",
      "Escalation notes",
      "Macro cleanup",
      "Tone checks",
    ],
    checks: ["Policy", "Empathy", "Promises", "Account details", "Refunds", "Final send"],
    boundaries: ["Refund decisions", "Policy exceptions", "Customer promises", "Sensitive account data"],
    prompt:
      "Summarize this safe ticket thread and draft a customer reply I can review. Do not promise refunds, credits, fixes, or timelines. If a fact is missing, mark it as “check first.” Include issue summary, missing facts, draft reply, internal escalation note, and what I should verify.",
    sampleCta: "See the Customer Support sample report",
    related: ["sales-coordinator", "operations-coordinator"],
  },
  {
    title: "Finance / Accounting Associate",
    shortTitle: "Finance / Accounting Associate",
    guideSlug: "ai-for-finance-accounting-associates",
    sampleSlug: "finance-accounting",
    sampleTitle: "Sample AI Work Plan: Finance / Accounting Associate",
    sampleDescription:
      "See a sample AI Work Plan for a Finance or Accounting Associate, including invoice exceptions, spreadsheet support, prompts, and review cautions.",
    guideTitle: "AI for Finance and Accounting Associates: What to Try First",
    guideDescription:
      "Learn how finance and accounting associates can use AI for invoice exceptions, clarification emails, spreadsheet support, and month-end checklists while keeping numbers and approvals in their hands.",
    h1: "AI for Finance and Accounting Associates: What to Try First, What to Check, and What Not to Hand Over",
    introRole: "finance or accounting associate",
    firstTest: "Turn invoice and payment questions into an exception tracker.",
    useCases: [
      "Invoice exception tracking",
      "Clarification email drafts",
      "Spreadsheet formula explanations",
      "Variance explanation drafts",
      "Month-end checklist cleanup",
    ],
    checks: ["Numbers", "Approval status", "Account coding", "Payment timing", "Vendor details"],
    boundaries: [
      "Accounting treatment",
      "Payment approval",
      "Confidential vendor terms",
      "Sensitive financial data",
    ],
    prompt:
      "Turn these safe invoice questions into an exception tracker. Do not invent amounts, approvals, account coding, or payment timing. Mark unclear items as “check first.” Create columns for vendor or role, issue, amount to verify, owner, status, next step, clarification question, and what I should check.",
    sampleCta: "See the Finance / Accounting sample report",
    related: ["junior-analyst", "office-manager"],
  },
  {
    title: "HR Coordinator",
    shortTitle: "HR Coordinator",
    guideSlug: "ai-for-hr-coordinators",
    sampleSlug: "hr-coordinator",
    sampleTitle: "Sample AI Work Plan: HR Coordinator",
    sampleDescription:
      "See a sample AI Work Plan for an HR Coordinator, including candidate coordination, privacy boundaries, prompts, and a 7-day plan.",
    guideTitle: "AI for HR Coordinators: What to Try First",
    guideDescription:
      "Learn how HR coordinators can use AI for interview coordination, scheduling messages, onboarding checklists, and approved HR communications while protecting privacy and fairness.",
    h1: "AI for HR Coordinators: What to Try First, What to Check, and What Not to Hand Over",
    introRole: "HR coordinator",
    firstTest: "Turn candidate and interview coordination notes into a next-step checklist.",
    useCases: [
      "Interview next-step checklists",
      "Neutral scheduling messages",
      "Onboarding checklists",
      "Approved HR announcement cleanup",
      "Job post clarity review",
    ],
    checks: ["Privacy", "Fairness", "Dates", "Owners", "Candidate communication", "Approval needs"],
    boundaries: [
      "Candidate evaluation",
      "Hiring decisions",
      "Employee-sensitive details",
      "Policy interpretation",
    ],
    prompt:
      "Turn these safe interview coordination notes into a next-step checklist. Do not evaluate the candidate. Do not recommend a hiring decision. Do not imply an offer or rejection. Mark missing information as “check first.”",
    sampleCta: "See the HR Coordinator sample report",
    related: ["admin-assistant", "office-manager"],
  },
  {
    title: "Sales Coordinator / Account Coordinator",
    shortTitle: "Sales Coordinator",
    guideSlug: "ai-for-sales-coordinators",
    sampleSlug: "sales-coordinator",
    sampleTitle: "Sample AI Work Plan: Sales Coordinator / Account Coordinator",
    sampleDescription:
      "See a sample AI Work Plan for a Sales Coordinator or Account Coordinator, including CRM updates, follow-up drafts, prompts, and review rules.",
    guideTitle: "AI for Sales Coordinators: What to Try First",
    guideDescription:
      "Learn how sales and account coordinators can use AI for CRM updates, follow-up checklists, customer drafts, and handoff summaries while keeping pricing and promises under review.",
    h1: "AI for Sales Coordinators: What to Try First, What to Check, and What Not to Hand Over",
    introRole: "sales or account coordinator",
    firstTest: "Turn call notes and email threads into a CRM update and follow-up checklist.",
    useCases: [
      "CRM updates from notes",
      "Follow-up checklists",
      "Customer follow-up drafts",
      "Proposal checklists",
      "Internal handoff summaries",
    ],
    checks: ["Pricing", "Promises", "Deal stage", "Owners", "Dates", "Customer-sensitive details"],
    boundaries: ["Pricing decisions", "Account strategy", "Contract terms", "Customer commitments"],
    prompt:
      "Turn these safe sales notes into a CRM update and follow-up checklist. Do not invent pricing, deal stage, timelines, or customer commitments. Separate confirmed facts from questions. Include summary, next steps, owners, due dates, open questions, and what I should verify.",
    sampleCta: "See the Sales Coordinator sample report",
    related: ["customer-support", "operations-coordinator"],
  },
  {
    title: "Operations / Project Coordinator",
    shortTitle: "Operations Coordinator",
    guideSlug: "ai-for-operations-coordinators",
    sampleSlug: "operations-coordinator",
    sampleTitle: "Sample AI Work Plan: Operations / Project Coordinator",
    sampleDescription:
      "See a sample AI Work Plan for an Operations or Project Coordinator, including status updates, risks, owners, prompts, and a 7-day plan.",
    guideTitle: "AI for Operations and Project Coordinators: What to Try First",
    guideDescription:
      "Learn how operations and project coordinators can use AI for status updates, risks, blockers, owners, SOP cleanup, and handoff summaries while keeping priorities and commitments under review.",
    h1: "AI for Operations and Project Coordinators: What to Try First, What to Check, and What Not to Hand Over",
    introRole: "operations or project coordinator",
    firstTest: "Turn messy project updates into a risks, owners, and next-steps table.",
    useCases: [
      "Status update tables",
      "Risks and blockers summaries",
      "Meeting notes to action items",
      "SOP cleanup",
      "Cross-team handoff summaries",
    ],
    checks: ["Owners", "Dates", "Blockers", "Priority", "Escalation", "Commitments"],
    boundaries: [
      "Priority decisions",
      "Escalation decisions",
      "Process authority",
      "External commitments",
    ],
    prompt:
      "Turn these safe project updates into a status table. Do not mark anything complete unless I say it is complete. If an owner, date, or next step is unclear, mark it as “check first.” Separate confirmed blockers from possible risks.",
    sampleCta: "See the Operations / Project Coordinator sample report",
    related: ["office-manager", "sales-coordinator"],
  },
  {
    title: "Junior Analyst / Reporting Associate",
    shortTitle: "Junior Analyst",
    guideSlug: "ai-for-junior-analysts",
    sampleSlug: "junior-analyst",
    sampleTitle: "Sample AI Work Plan: Junior Analyst / Reporting Associate",
    sampleDescription:
      "See a sample AI Work Plan for a Junior Analyst or Reporting Associate, including spreadsheet notes, report outlines, prompts, and review rules.",
    guideTitle: "AI for Junior Analysts: What to Try First",
    guideDescription:
      "Learn how junior analysts and reporting associates can use AI for report outlines, variance questions, spreadsheet notes, and review checklists while keeping numbers and conclusions under review.",
    h1: "AI for Junior Analysts: What to Try First, What to Check, and What Not to Hand Over",
    introRole: "junior analyst or reporting associate",
    firstTest: "Turn spreadsheet notes into a report outline, variance questions, and review checklist.",
    useCases: [
      "Report outlines from notes",
      "Variance question lists",
      "Formula explanations",
      "Summary drafts",
      "Data cleanup checklists",
    ],
    checks: ["Numbers", "Sources", "Assumptions", "Formulas", "Recommendations", "Final conclusions"],
    boundaries: [
      "Source validation",
      "Final analysis",
      "Recommendations",
      "Confidential data",
      "Business conclusions",
    ],
    prompt:
      "Help me turn these safe spreadsheet notes into a report outline and review checklist. Do not invent causes or conclusions. Separate confirmed facts from questions. Mark anything I need to verify.",
    sampleCta: "See the Junior Analyst sample report",
    related: ["finance-accounting", "operations-coordinator"],
  },
];

const roleBySample = new Map(roles.map((role) => [role.sampleSlug, role]));
const sampleSlugs = roles.map((role) => role.sampleSlug);
const roleSlugs = roles.map((role) => role.guideSlug);

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 2).replaceAll("</", "<\\/")}</script>`;
}

function canonical(path) {
  return `${siteUrl}${path}`;
}

function ogImage(name) {
  return `${siteUrl}/assets/og/${name}.svg`;
}

function pageHead({ title, description, path, imageName, type = "website", schema = [] }) {
  const url = canonical(path);
  return `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${esc(url)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:type" content="${esc(type)}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(ogImage(imageName))}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${esc(ogImage(imageName))}" />
    ${schema.map(jsonLd).join("\n    ")}`;
}

function replaceHead(file, headHtml) {
  const cleaned = file
    .replace(/\s*<link rel="canonical"[\s\S]*?\/>/g, "")
    .replace(/\s*<meta property="og:[\s\S]*?\/>/g, "")
    .replace(/\s*<meta name="twitter:[\s\S]*?\/>/g, "")
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
  return cleaned.replace(/<title>[\s\S]*?<\/title>\s*<meta\s+name="description"[\s\S]*?\/>/, headHtml.trim());
}

function breadcrumb(pathItems) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: pathItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

function nav(prefix) {
  return `<header class="site-header">
      <nav class="nav-shell" aria-label="Primary navigation">
        <a class="brand" href="${prefix}index.html" aria-label="Your AI Work Plan home">
          <span class="brand-mark" aria-hidden="true"><span></span></span>
          <span>Your AI Work Plan</span>
        </a>
        <div class="nav-links">
          <a href="${prefix}samples.html">Sample Report</a>
          <a href="${prefix}index.html#what-you-get">What You Get</a>
          <a href="${prefix}index.html#how-it-works">How It Works</a>
          <a href="${prefix}privacy.html">Privacy</a>
          <a href="${prefix}index.html#faq">FAQ</a>
          <a class="mobile-menu-cta" href="${prefix}index.html#pricing">Get my AI Work Plan — $9.99</a>
        </div>
        <div class="nav-actions">
          <a class="button button-small" href="${prefix}index.html#pricing">Get my AI Work Plan — $9.99</a>
        </div>
        <button class="mobile-toggle" type="button" aria-label="Open menu" aria-expanded="false">Menu</button>
      </nav>
    </header>`;
}

function footer(prefix) {
  return `<footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand" href="${prefix}index.html" aria-label="Your AI Work Plan home">
            <span class="brand-mark" aria-hidden="true"><span></span></span>
            <span>Your AI Work Plan</span>
          </a>
          <p>Paid personal reports that turn real office work into practical AI work plans.</p>
          <p class="powered-note">Interview technology powered by Lemma.</p>
        </div>
        <div class="footer-group">
          <span>Report</span>
          <a href="${prefix}samples.html">Sample Report</a>
          <a href="${prefix}index.html#what-you-get">What You Get</a>
          <a href="${prefix}index.html#pricing">Get my AI Work Plan</a>
        </div>
        <div class="footer-group">
          <span>Product</span>
          <a href="${prefix}index.html#how-it-works">How It Works</a>
          <a href="${prefix}methodology.html">Methodology</a>
          <a href="${prefix}privacy.html">Privacy</a>
        </div>
        <div class="footer-group">
          <span>Examples</span>
          <a href="${prefix}samples.html">Sample reports</a>
          <a href="${prefix}roles/ai-for-administrative-assistants/">AI for administrative assistants</a>
          <a href="${prefix}roles/ai-for-customer-support-reps/">AI for customer support reps</a>
        </div>
      </div>
    </footer>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function renderBreadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">
          ${items
            .map((item, index) =>
              index === items.length - 1
                ? `<span aria-current="page">${esc(item.name)}</span>`
                : `<a href="${esc(item.href)}">${esc(item.name)}</a>`
            )
            .join("<span aria-hidden=\"true\">/</span>")}
        </nav>`;
}

function roleGuideHtml(role) {
  const path = `/roles/${role.guideSlug}/`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: role.guideTitle,
      description: role.guideDescription,
      url: canonical(path),
    },
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Role guides", path: "/roles/" },
      { name: role.shortTitle, path },
    ]),
  ];

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${pageHead({
      title: role.guideTitle,
      description: role.guideDescription,
      path,
      imageName: `role-${role.guideSlug}`,
      type: "article",
      schema,
    })}
    <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="../../styles.css" />
  </head>
  <body>
    ${nav("../../")}

    <main>
      <section class="page-hero role-guide-hero">
        <div class="container">
          ${renderBreadcrumbs([
            { name: "Home", href: "../../index.html" },
            { name: "Role guides", href: "../" },
            { name: role.shortTitle, href: `./` },
          ])}
          <p class="eyebrow">Role guide</p>
          <h1>${esc(role.h1)}</h1>
          <p>AI can help with parts of ${esc(role.introRole)} work, but the safest starting point is not handing over the whole job. Start with one repeated task that is easy to review.</p>
          <div class="hero-actions">
            <a class="button button-blue" href="../../index.html#pricing">Get my AI Work Plan — $9.99</a>
            <a class="button" href="../../samples/${role.sampleSlug}/">${esc(role.sampleCta)}</a>
          </div>
        </div>
      </section>

      <section class="section section-tight">
        <div class="container role-guide-layout">
          <article class="role-guide-main">
            <section class="role-guide-section">
              <p class="section-label">01 · WHERE AI CAN HELP</p>
              <h2>Where AI can help in this role</h2>
              <p>Start with tasks that are repeated, written, structured, and easy for you to check before anything is used.</p>
              ${list(role.useCases)}
            </section>

            <section class="role-guide-section">
              <p class="section-label">02 · BEST FIRST TEST</p>
              <h2>${esc(role.firstTest)}</h2>
              <p>This is specific enough to test in a week. It gives you a visible result without asking AI to make decisions for you.</p>
            </section>

            <section class="role-guide-section">
              <p class="section-label">03 · TOOL INPUTS</p>
              <h2>What to put into the tool</h2>
              <p>Use safe notes, known facts, the audience, the output format you want, and the exact things the tool should not invent.</p>
            </section>

            <section class="role-guide-section">
              <p class="section-label">04 · REVIEW RULES</p>
              <h2>What to check before using the output</h2>
              ${list(role.checks)}
            </section>

            <section class="role-guide-section">
              <p class="section-label">05 · BOUNDARIES</p>
              <h2>What not to hand over</h2>
              ${list(role.boundaries)}
            </section>

            <section class="role-guide-section">
              <p class="section-label">06 · SAMPLE PROMPT</p>
              <h2>A prompt to start with</h2>
              <div class="prompt-card">
                <div class="prompt-box">${esc(role.prompt)}</div>
              </div>
            </section>

            <section class="role-guide-section cta-panel">
              <p class="section-label">07 · FULL SAMPLE</p>
              <h2>See the full sample AI Work Plan</h2>
              <p>The sample report shows the work map, AI opportunity map, first test, input recipe, prompts, and 7-day plan for this role.</p>
              <a class="button" href="../../samples/${role.sampleSlug}/">${esc(role.sampleCta)}</a>
            </section>

            <section class="role-guide-section cta-panel strong">
              <p class="section-label">08 · PERSONAL REPORT</p>
              <h2>Get your personal AI Work Plan</h2>
              <p>Talk for about 10 minutes and get a report based on your actual tasks, tools, examples, and risk points.</p>
              <a class="button button-blue" href="../../index.html#pricing">Get my AI Work Plan — $9.99</a>
            </section>
          </article>

          <aside class="role-guide-side" aria-label="Related pages">
            <div>
              <span>Sample report</span>
              <a href="../../samples/${role.sampleSlug}/">${esc(role.sampleCta)}</a>
            </div>
            <div>
              <span>More samples</span>
              <a href="../../samples.html">Browse all sample AI Work Plans</a>
            </div>
            <div>
              <span>Related samples</span>
              ${role.related.map((slug) => {
                const related = roleBySample.get(slug);
                return `<a href="../../samples/${slug}/">${esc(related.title)}</a>`;
              }).join("")}
            </div>
          </aside>
        </div>
      </section>
    </main>

    ${footer("../../")}
    <script src="../../script.js"></script>
  </body>
</html>`;
}

function svg(textTop, textBottom) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${esc(`${textTop} ${textBottom}`)}">
  <rect width="1200" height="630" fill="#fbfaf7"/>
  <rect x="84" y="72" width="1032" height="486" rx="18" fill="#fffdf8" stroke="#d4c8b8" stroke-width="3"/>
  <rect x="132" y="126" width="120" height="14" rx="7" fill="#3f6f63"/>
  <rect x="132" y="168" width="520" height="10" rx="5" fill="#e7dfd3"/>
  <rect x="132" y="198" width="420" height="10" rx="5" fill="#e7dfd3"/>
  <text x="132" y="322" fill="#171412" font-family="Arial, sans-serif" font-size="64" font-weight="700">${esc(textTop)}</text>
  <text x="132" y="395" fill="#615c55" font-family="Arial, sans-serif" font-size="38">${esc(textBottom)}</text>
  <rect x="132" y="464" width="360" height="46" rx="6" fill="#eef5f1" stroke="#d4c8b8"/>
  <text x="156" y="496" fill="#2f564d" font-family="Arial, sans-serif" font-size="24" font-weight="700">Practical report, not AI hype</text>
</svg>`;
}

async function writeOgImages() {
  const dir = new URL("../assets/og/", import.meta.url);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL("home.svg", dir), svg("Your AI Work Plan", "Find where AI fits your actual job."));
  await writeFile(new URL("sample-hub.svg", dir), svg("Sample AI Work Plans", "See examples by role."));
  for (const role of roles) {
    await writeFile(new URL(`sample-${role.sampleSlug}.svg`, dir), svg("Sample AI Work Plan", role.title));
    await writeFile(new URL(`role-${role.guideSlug}.svg`, dir), svg(`AI for ${role.shortTitle}`, "What to try first."));
  }
}

async function updateHomepage() {
  const path = new URL("../index.html", import.meta.url);
  let html = await readFile(path, "utf8");
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Your AI Work Plan",
      url: canonical("/"),
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Your AI Work Plan",
      description:
        "A personal AI work report based on a 10-minute voice interview. The report shows where AI fits your actual job, what to try first, what prompts to use, what to check, and what not to automate yet.",
      brand: { "@type": "Brand", name: "Your AI Work Plan" },
      offers: {
        "@type": "Offer",
        price: "9.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: canonical("/"),
      },
    },
  ];
  html = replaceHead(
    html,
    pageHead({
      title: "Your AI Work Plan — Find Where AI Fits Your Job",
      description:
        "Talk for 10 minutes and get a personal AI Work Plan showing where AI fits your actual job, what to try first, what prompts to use, and what to check yourself.",
      path: "/",
      imageName: "home",
      schema,
    })
  );
  html = html.replace(/\n\s*<a class="text-link secondary-link" href="\.\/roles\/[^"]+\/">Read the AI guide for this role<\/a>/g, "");
  html = html.replace(
    /(<a class="text-link" href="\.\/samples\/([^/]+)\/">View sample report<\/a>)/g,
    (match, link, slug) => {
      const role = roleBySample.get(slug);
      if (!role) return match;
      return `${link}\n              <a class="text-link secondary-link" href="./roles/${role.guideSlug}/">Read the AI guide for this role</a>`;
    }
  );
  await writeFile(path, html);
}

async function updateSamplesHub() {
  const path = new URL("../samples.html", import.meta.url);
  let html = await readFile(path, "utf8");
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: roles.map((role, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: role.sampleTitle,
      url: canonical(`/samples/${role.sampleSlug}/`),
    })),
  };
  html = replaceHead(
    html,
    pageHead({
      title: "Sample AI Work Plans — See Reports by Role",
      description:
        "See sample AI Work Plans for administrative assistants, office managers, customer support reps, finance associates, HR coordinators, sales coordinators, operations coordinators, and junior analysts.",
      path: "/samples",
      imageName: "sample-hub",
      schema: [
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Sample AI Work Plans", path: "/samples" },
        ]),
        itemList,
      ],
    })
  );
  html = html.replace(/\n\s*<a class="text-link secondary-link" href="\.\/roles\/[^"]+\/">Read the AI guide for this role<\/a>/g, "");
  html = html.replace(
    /(<a class="text-link" href="\.\/samples\/([^/]+)\/">View sample report<\/a>)/g,
    (match, link, slug) => {
      const role = roleBySample.get(slug);
      if (!role) return match;
      return `${link}\n              <a class="text-link secondary-link" href="./roles/${role.guideSlug}/">Read the AI guide for this role</a>`;
    }
  );
  await writeFile(path, html);
}

async function updateSampleReport(role) {
  const dir = new URL(`../samples/${role.sampleSlug}/`, import.meta.url);
  const path = new URL("index.html", dir);
  let html = await readFile(path, "utf8");
  html = replaceHead(
    html,
    pageHead({
      title: role.sampleTitle,
      description: role.sampleDescription,
      path: `/samples/${role.sampleSlug}/`,
      imageName: `sample-${role.sampleSlug}`,
      type: "article",
      schema: [
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Sample AI Work Plans", path: "/samples" },
          { name: role.title, path: `/samples/${role.sampleSlug}/` },
        ]),
      ],
    })
  );
  html = html.replace(/<nav class="breadcrumbs" aria-label="Breadcrumb">[\s\S]*?<\/nav>\s*/g, "");
  html = html.replace(
    /<p class="eyebrow">Sample report<\/p>/,
    `${renderBreadcrumbs([
      { name: "Home", href: "../../index.html" },
      { name: "Sample AI Work Plans", href: "../../samples.html" },
      { name: role.title, href: "./" },
    ])}\n          <p class="eyebrow">Sample report</p>`
  );
  html = html.replace(/\s*<div class="sample-related-links">[\s\S]*?<\/div>\s*/g, "");
  html = html.replace(
    /<p class="section-cta centered">\s*<a class="button button-blue" href="..\/..\/index.html#pricing">Get my AI Work Plan — \$9.99<\/a>\s*<\/p>/,
    `<p class="section-cta centered">
            <a class="button button-blue" href="../../index.html#pricing">Get my AI Work Plan — $9.99</a>
            <a class="button" href="../../roles/${role.guideSlug}/">${esc(role.sampleCta).replace("See", "Read the guide behind")}</a>
          </p>`
  );
  html = html.replace(
    /(<p class="section-cta"><a class="button button-blue" href="..\/..\/index.html#pricing">Get my AI Work Plan — \$9.99<\/a><\/p>)/,
    `<div class="sample-related-links">
              <span>Keep exploring</span>
              <a href="../../roles/${role.guideSlug}/">Read the AI guide for this role</a>
              <a href="../../samples.html">Browse all sample AI Work Plans</a>
              ${role.related.map((slug) => {
                const related = roleBySample.get(slug);
                return `<a href="../../samples/${slug}/">See the ${esc(related.shortTitle)} sample report</a>`;
              }).join("\n              ")}
            </div>
            $1`
  );
  await writeFile(path, html);

  for (const legacyFile of role.sampleSlug === "admin-assistant"
    ? ["administrative-assistant.html"]
    : role.sampleSlug === "operations-coordinator"
      ? ["operations-manager.html"]
      : []) {
    await writeFile(new URL(`../samples/${legacyFile}`, import.meta.url), html.replaceAll("../../", "../"));
  }
}

function rolesHubHtml() {
  const path = "/roles/";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${pageHead({
      title: "AI Guides for Office Roles — Your AI Work Plan",
      description:
        "Browse practical AI guides for administrative assistants, office managers, support reps, finance associates, HR coordinators, sales coordinators, operations coordinators, and junior analysts.",
      path,
      imageName: "sample-hub",
      schema: [
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Role guides", path },
        ]),
      ],
    })}
    <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    ${nav("../")}
    <main>
      <section class="page-hero">
        <div class="container">
          ${renderBreadcrumbs([
            { name: "Home", href: "../index.html" },
            { name: "Role guides", href: "./" },
          ])}
          <p class="eyebrow">Role guides</p>
          <h1>AI Guides for Office Roles</h1>
          <p>Choose the role closest to your work. Each guide shows what to try first, what to check, and what not to hand over.</p>
        </div>
      </section>
      <section class="section section-tight">
        <div class="container role-sample-grid">
          ${roles.map((role) => `<article class="role-sample-card">
            <h3>${esc(role.title)}</h3>
            <p>${esc(role.guideDescription)}</p>
            <dl>
              <dt>Best first AI test</dt>
              <dd>${esc(role.firstTest)}</dd>
            </dl>
            <a class="text-link" href="./${role.guideSlug}/">Read the AI guide</a>
            <a class="text-link secondary-link" href="../samples/${role.sampleSlug}/">${esc(role.sampleCta)}</a>
          </article>`).join("\n")}
        </div>
      </section>
    </main>
    ${footer("../")}
    <script src="../script.js"></script>
  </body>
</html>`;
}

async function writeRoleGuides() {
  await mkdir(new URL("../roles/", import.meta.url), { recursive: true });
  await writeFile(new URL("../roles/index.html", import.meta.url), rolesHubHtml());
  for (const role of roles) {
    const dir = new URL(`../roles/${role.guideSlug}/`, import.meta.url);
    await mkdir(dir, { recursive: true });
    await writeFile(new URL("index.html", dir), roleGuideHtml(role));
  }
}

async function writeSitemapAndRobots() {
  const urls = [
    "/",
    "/samples",
    "/roles/",
    "/privacy.html",
    "/methodology.html",
    ...roles.map((role) => `/samples/${role.sampleSlug}/`),
    ...roles.map((role) => `/roles/${role.guideSlug}/`),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${esc(canonical(path))}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;
  await writeFile(new URL("../sitemap.xml", import.meta.url), sitemap);
  await writeFile(
    new URL("../robots.txt", import.meta.url),
    `User-agent: *
Allow: /
Disallow: /checkout/
Disallow: /checkout-success/
Disallow: /payment-callback/
Disallow: /report/
Disallow: /reports/
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`
  );
}

await writeOgImages();
await updateHomepage();
await updateSamplesHub();
for (const role of roles) {
  await updateSampleReport(role);
}
await writeRoleGuides();
await writeSitemapAndRobots();

console.log(`Applied SEO pass for ${roles.length} sample reports and ${roles.length} role guides.`);
