import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const siteUrl = "https://youraiworkplan.com";
const root = new URL("../", import.meta.url);

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

function head({ title, description, path, image = "home", schema = [] }) {
  const url = `${siteUrl}${path}`;
  return `<title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${esc(url)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${siteUrl}/assets/og/${image}.svg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${siteUrl}/assets/og/${image}.svg" />
    ${schema.map(jsonLd).join("\n    ")}`;
}

function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

function nav(prefix = "./") {
  return `<header class="site-header">
      <nav class="nav-shell" aria-label="Primary navigation">
        <a class="brand" href="${prefix}index.html" aria-label="Your AI Work Plan home">
          <span class="brand-mark" aria-hidden="true"><span></span></span>
          <span>Your AI Work Plan</span>
        </a>
        <div class="nav-links">
          <a href="${prefix}what-you-get.html">What You Get</a>
          <a href="${prefix}samples.html">Sample Reports</a>
          <a href="${prefix}how-it-works.html">How It Works</a>
          <a href="${prefix}faq.html">FAQ</a>
          <a class="mobile-menu-cta" href="${prefix}index.html#pricing">Get my AI Work Plan — $9.99</a>
        </div>
        <div class="nav-actions">
          <a class="button button-small" href="${prefix}index.html#pricing">Get my AI Work Plan — $9.99</a>
        </div>
        <button class="mobile-toggle" type="button" aria-label="Open menu" aria-expanded="false">Menu</button>
      </nav>
    </header>`;
}

function footer(prefix = "./") {
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
          <span>Start</span>
          <a href="${prefix}what-you-get.html">What You Get</a>
          <a href="${prefix}samples.html">Sample Reports</a>
          <a href="${prefix}index.html#pricing">Get my AI Work Plan</a>
        </div>
        <div class="footer-group">
          <span>Learn</span>
          <a href="${prefix}how-it-works.html">How It Works</a>
          <a href="${prefix}roles/">Role Guides</a>
          <a href="${prefix}faq.html">FAQ</a>
        </div>
        <div class="footer-group">
          <span>Trust</span>
          <a href="${prefix}methodology.html">Methodology</a>
          <a href="${prefix}privacy.html">Privacy</a>
        </div>
      </div>
    </footer>`;
}

function fullPage({ title, description, path, eyebrow, h1, intro, body, schema = [] }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${head({ title, description, path, schema })}
    <link rel="icon" href="./favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    ${nav("./")}
    <main>
      <section class="page-hero simple-page-hero">
        <div class="container">
          <p class="eyebrow">${esc(eyebrow)}</p>
          <h1>${esc(h1)}</h1>
          <p>${esc(intro)}</p>
        </div>
      </section>
      ${body}
    </main>
    ${footer("./")}
    <script src="./script.js"></script>
  </body>
</html>`;
}

const whatYouGet = fullPage({
  title: "What You Get — Your AI Work Plan",
  description:
    "See what is included in a personal AI Work Plan, including a work map, first test, tool inputs, prompts, review rules, and a 7-day plan.",
  path: "/what-you-get.html",
  eyebrow: "What you get",
  h1: "A personal report you can use this week.",
  intro:
    "Your AI Work Plan turns your actual work into a practical starting point for using AI without guessing what to try first.",
  schema: [breadcrumb([{ name: "Home", path: "/" }, { name: "What You Get", path: "/what-you-get.html" }])],
  body: `<section class="section section-tight">
        <div class="container split-page-grid">
          <article class="role-guide-section">
            <p class="section-label">Inside the report</p>
            <h2>It starts with your work, not a random tool list.</h2>
            <ul>
              <li>A plain-English recommendation.</li>
              <li>A map of your repeated work.</li>
              <li>Where the AI gap shows up in your role.</li>
              <li>A ranked AI opportunity map.</li>
              <li>One specific first test to try this week.</li>
              <li>What tools or tool categories to use.</li>
              <li>What to put into those tools.</li>
              <li>What to leave out for privacy, quality, or policy reasons.</li>
              <li>Copy-paste prompts for your actual tasks.</li>
              <li>What to check before using the output.</li>
              <li>What you should still decide yourself.</li>
              <li>A simple 7-day test plan.</li>
            </ul>
          </article>
          <aside class="role-guide-section cta-panel strong">
            <p class="section-label">Best next step</p>
            <h2>Look at a sample first.</h2>
            <p>The sample reports show the actual artifact: work map, boundaries, first test, prompts, and 7-day plan.</p>
            <a class="button" href="./samples.html">See sample reports</a>
            <a class="button button-blue" href="./index.html#pricing">Get my AI Work Plan — $9.99</a>
          </aside>
        </div>
      </section>`,
});

const howItWorks = fullPage({
  title: "How It Works — Your AI Work Plan",
  description:
    "Learn how a short voice interview becomes a personal AI Work Plan with tasks, prompts, tool inputs, review rules, and a first test.",
  path: "/how-it-works.html",
  eyebrow: "How it works",
  h1: "From a short interview to a personal work plan.",
  intro:
    "No long course. No tool directory to sort through. Talk through your work, then get a report that shows where to start.",
  schema: [breadcrumb([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works.html" }])],
  body: `<section class="section section-tight">
        <div class="container">
          <div class="steps page-steps">
            <article class="step">
              <span>01</span>
              <h3>Talk through your work</h3>
              <p>Answer simple questions about your role, repeated tasks, tools, examples, and where mistakes would matter.</p>
            </article>
            <article class="step">
              <span>02</span>
              <h3>Your report is built</h3>
              <p>Your answers are turned into a work map, first test, prompts, input instructions, review rules, and boundaries.</p>
            </article>
            <article class="step">
              <span>03</span>
              <h3>Use one real test</h3>
              <p>Start with the first recommended task. Review the output, then decide what belongs in your routine.</p>
            </article>
          </div>
        </div>
      </section>
      <section class="section section-tight">
        <div class="container split-page-grid">
          <article class="comparison-panel">
            <h3>Why voice</h3>
            <p>A form gets the obvious answer. A short voice interview lets you explain the messy details: where requests come from, what gets missed, what tools you use, and what feels risky.</p>
          </article>
          <article class="comparison-panel good">
            <h3>Why the report is practical</h3>
            <p>The report looks for repeated work, safe starting points, useful inputs, review rules, and places where your judgment still matters.</p>
          </article>
        </div>
      </section>
      <section class="final-cta">
        <div class="container">
          <h2>Know where AI fits your work.</h2>
          <p>Talk for a few minutes and get a personal report with one clear first test.</p>
          <a class="button button-blue" href="./index.html#pricing">Get my AI Work Plan — $9.99</a>
        </div>
      </section>`,
});

const faq = fullPage({
  title: "FAQ — Your AI Work Plan",
  description:
    "Common questions about Your AI Work Plan, sample reports, privacy, AI tools, and what to expect from the paid report.",
  path: "/faq.html",
  eyebrow: "FAQ",
  h1: "Questions before you start.",
  intro:
    "The report is designed for regular office workers who want a practical AI starting point, not a technical training program.",
  schema: [
    breadcrumb([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq.html" }]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need to know anything about AI first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The interview is designed for people who do not want jargon. You just talk about your job, repeated tasks, tools, and where you want help.",
          },
        },
        {
          "@type": "Question",
          name: "What do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You get a personal AI Work Plan showing where AI fits your work, what to try first, what tools or tool categories to use, prompts, and review rules.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The voice interview takes a few minutes. Your report link is sent by email after the interview.",
          },
        },
      ],
    },
  ],
  body: `<section class="section section-tight">
        <div class="container faq-grid">
          <details class="faq-item" open>
            <summary>Do I need to know anything about AI first?</summary>
            <p>No. The interview is designed for people who do not want jargon. You just talk about your job, your repeated tasks, the tools you use, and where you want help.</p>
          </details>
          <details class="faq-item">
            <summary>Is this an AI course?</summary>
            <p>No. Your AI Work Plan is a personal report. It is not a course, certification, prompt library, or long training program.</p>
          </details>
          <details class="faq-item">
            <summary>Who is this for?</summary>
            <p>It is for regular office workers who are starting to feel that AI is becoming a workplace skill.</p>
          </details>
          <details class="faq-item">
            <summary>What do I get?</summary>
            <p>You get a personal AI Work Plan showing where AI fits your work, what to try first, which tools or tool categories to use, what to put into them, what prompts to use, and what you should still check or decide yourself.</p>
          </details>
          <details class="faq-item">
            <summary>How long does it take?</summary>
            <p>The voice interview takes a few minutes. Your report link is sent by email after the interview.</p>
          </details>
          <details class="faq-item">
            <summary>What tools might you recommend?</summary>
            <p>The report may recommend common AI tools or tool types that fit your work, such as writing assistants, spreadsheet help, meeting note tools, summarizers, or tools already available in your workplace.</p>
          </details>
          <details class="faq-item">
            <summary>Will this tell me my job is being replaced?</summary>
            <p>No. The report is not a prediction about whether your job will disappear. It is a practical plan for where AI can help with parts of your work today and where your judgment still matters.</p>
          </details>
          <details class="faq-item">
            <summary>Is it safe to use AI for work?</summary>
            <p>It depends on the task, the tool, and the information involved. That is why the report includes privacy, quality, and review cautions.</p>
          </details>
          <details class="faq-item">
            <summary>What if my work is sensitive?</summary>
            <p>The report will help flag sensitive areas where you should be careful. You should also follow your company’s policies.</p>
          </details>
          <details class="faq-item">
            <summary>What if I already use ChatGPT or Copilot?</summary>
            <p>This can still help. The report helps turn scattered use into a clearer plan: what to use AI for, what prompts to use, what to check, and what to try for one week.</p>
          </details>
        </div>
      </section>
      <section class="final-cta">
        <div class="container">
          <h2>Start with one clear AI test.</h2>
          <p>Get a personal report based on your actual job.</p>
          <a class="button button-blue" href="./index.html#pricing">Get my AI Work Plan — $9.99</a>
        </div>
      </section>`,
});

function replaceTimes(html) {
  return html
    .replaceAll("Talk for 10 minutes", "Talk for a few minutes")
    .replaceAll("Talk for about 10 minutes", "Talk for a few minutes")
    .replaceAll("talk for about 10 minutes", "talk for a few minutes")
    .replaceAll("for about 10 minutes", "for a few minutes")
    .replaceAll("about 10 minutes", "a few minutes")
    .replaceAll("10-minute voice interview", "short voice interview")
    .replaceAll("10-minute interview", "short interview")
    .replaceAll("10-minute AI Work Report voice interview", "short AI Work Report voice interview")
    .replaceAll("$9.99 — a few minutes — report link sent by email", "$9.99 — a few minutes — report link sent by email");
}

async function htmlFiles(dirUrl) {
  const dir = new URL(dirUrl, root);
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const rel = join(dirUrl, entry.name);
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    if (entry.isDirectory()) files.push(...await htmlFiles(`${rel}/`));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(rel);
  }
  return files;
}

function prefixFor(file) {
  const depth = file.split("/").length - 1;
  if (depth === 0) return "./";
  return "../".repeat(depth);
}

async function updateExistingPages() {
  const files = await htmlFiles("./");
  for (const file of files) {
    const fileUrl = new URL(file, root);
    let html = await readFile(fileUrl, "utf8");
    const prefix = prefixFor(file);
    html = replaceTimes(html);
    html = html.replace(/<header class="site-header">[\s\S]*?<\/header>/, nav(prefix));
    html = html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footer(prefix));
    html = html
      .replaceAll("Read the guide behind the Administrative Assistant sample report", "Read role guide")
      .replaceAll("Read the guide behind the Office Manager sample report", "Read role guide")
      .replaceAll("Read the guide behind the Customer Support sample report", "Read role guide")
      .replaceAll("Read the guide behind the Finance / Accounting sample report", "Read role guide")
      .replaceAll("Read the guide behind the HR Coordinator sample report", "Read role guide")
      .replaceAll("Read the guide behind the Sales Coordinator sample report", "Read role guide")
      .replaceAll("Read the guide behind the Operations / Project Coordinator sample report", "Read role guide")
      .replaceAll("Read the guide behind the Junior Analyst sample report", "Read role guide")
      .replace(/<a class="button" href="(\.\.\/\.\.\/roles\/[^"]+\/)">Read role guide<\/a>/g, '<a class="button button-light" href="$1">Read role guide</a>')
      .replace(/<a class="button" href="(\.\.\/roles\/[^"]+\/)">Read role guide<\/a>/g, '<a class="button button-light" href="$1">Read role guide</a>');
    await writeFile(fileUrl, html);
  }
}

async function writeNewPages() {
  await writeFile(new URL("what-you-get.html", root), replaceTimes(whatYouGet));
  await writeFile(new URL("how-it-works.html", root), replaceTimes(howItWorks));
  await writeFile(new URL("faq.html", root), replaceTimes(faq));
}

async function updateTextFiles() {
  for (const file of ["scripts/apply-seo-pass.mjs", "scripts/generate-sample-reports.mjs", "sitemap.xml"]) {
    const fileUrl = new URL(file, root);
    let text = await readFile(fileUrl, "utf8");
    text = replaceTimes(text)
      .replaceAll('Sample Report</a>', 'Sample Reports</a>')
      .replaceAll('${prefix}samples.html">Sample Report', '${prefix}samples.html">Sample Reports')
      .replaceAll('index.html#what-you-get', 'what-you-get.html')
      .replaceAll('index.html#how-it-works', 'how-it-works.html')
      .replaceAll('index.html#faq', 'faq.html');
    await writeFile(fileUrl, text);
  }
}

async function updateSitemap() {
  const paths = [
    "/",
    "/what-you-get.html",
    "/samples",
    "/roles/",
    "/how-it-works.html",
    "/faq.html",
    "/privacy.html",
    "/methodology.html",
    "/samples/admin-assistant/",
    "/samples/office-manager/",
    "/samples/customer-support/",
    "/samples/finance-accounting/",
    "/samples/hr-coordinator/",
    "/samples/sales-coordinator/",
    "/samples/operations-coordinator/",
    "/samples/junior-analyst/",
    "/roles/ai-for-administrative-assistants/",
    "/roles/ai-for-office-managers/",
    "/roles/ai-for-customer-support-reps/",
    "/roles/ai-for-finance-accounting-associates/",
    "/roles/ai-for-hr-coordinators/",
    "/roles/ai-for-sales-coordinators/",
    "/roles/ai-for-operations-coordinators/",
    "/roles/ai-for-junior-analysts/",
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>2026-05-17</lastmod>
  </url>`).join("\n")}
</urlset>
`;
  await writeFile(new URL("sitemap.xml", root), sitemap);
}

await mkdir(root, { recursive: true });
await updateExistingPages();
await writeNewPages();
await updateTextFiles();
await updateSitemap();

console.log("Applied UX fixes.");
