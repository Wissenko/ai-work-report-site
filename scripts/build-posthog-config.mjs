import fs from "node:fs";

const projectToken =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  process.env.POSTHOG_PROJECT_TOKEN ||
  "";
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

const file = `window.__GROWTH_POSTHOG_CONFIG__ = ${JSON.stringify(
  {
    projectToken,
    host,
  },
  null,
  2,
)};\n`;

fs.writeFileSync("posthog-config.js", file);

if (!projectToken) {
  console.warn(
    "POSTHOG: no NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN or POSTHOG_PROJECT_TOKEN set; tracking will stay disabled.",
  );
}
