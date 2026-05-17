import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const ignoredDirs = new Set([".git", "node_modules", "playwright-report", "test-results", ".lighthouseci"]);
const htmlFiles = [];
const errors = [];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
}

function rel(file) {
  return path.relative(root, file);
}

function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

function findAttributes(html, attr) {
  const matches = [];
  const pattern = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, "gi");
  let match;
  while ((match = pattern.exec(html))) matches.push(match[1]);
  return matches;
}

function normalizeCandidate(file, rawValue) {
  const value = rawValue.trim();
  if (
    !value ||
    value === "#" ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("data:") ||
    value.startsWith("javascript:")
  ) {
    return null;
  }

  const [targetPath, hash = ""] = value.split("#");
  if (!targetPath) {
    return {
      file: path.resolve(path.dirname(file), rel(file)),
      hash,
      samePage: true
    };
  }

  const resolved = path.resolve(path.dirname(file), targetPath);
  return { file: resolved, hash, samePage: false };
}

async function resolveTarget(candidate) {
  const possible = [];
  const ext = path.extname(candidate.file);

  if (ext) {
    possible.push(candidate.file);
  } else {
    possible.push(candidate.file);
    possible.push(`${candidate.file}.html`);
    possible.push(path.join(candidate.file, "index.html"));
  }

  for (const file of possible) {
    try {
      const stat = await fs.stat(file);
      if (stat.isFile()) return file;
      if (stat.isDirectory()) {
        const indexFile = path.join(file, "index.html");
        await fs.access(indexFile);
        return indexFile;
      }
    } catch {
      // Try the next candidate.
    }
  }

  return null;
}

function idsFor(html) {
  return new Set(findAttributes(html, "id"));
}

await walk(root);

for (const file of htmlFiles) {
  const html = stripComments(await fs.readFile(file, "utf8"));
  const fileLabel = rel(file);
  const titleCount = (html.match(/<title>[^<]+<\/title>/gi) || []).length;
  const descriptionCount = (html.match(/<meta\s+name=["']description["']/gi) || []).length;
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const ids = findAttributes(html, "id");
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

  if (titleCount !== 1) errors.push(`${fileLabel}: expected exactly one <title>, found ${titleCount}.`);
  if (descriptionCount !== 1) {
    errors.push(`${fileLabel}: expected exactly one meta description, found ${descriptionCount}.`);
  }
  if (h1Count !== 1) errors.push(`${fileLabel}: expected exactly one <h1>, found ${h1Count}.`);
  if (duplicateIds.length) {
    errors.push(`${fileLabel}: duplicate id(s): ${Array.from(new Set(duplicateIds)).join(", ")}.`);
  }

  const localIds = idsFor(html);
  const references = [
    ...findAttributes(html, "href"),
    ...findAttributes(html, "src")
  ];

  for (const reference of references) {
    const candidate = normalizeCandidate(file, reference);
    if (!candidate) continue;

    if (candidate.samePage) {
      if (candidate.hash && !localIds.has(candidate.hash)) {
        errors.push(`${fileLabel}: missing same-page anchor #${candidate.hash}.`);
      }
      continue;
    }

    const target = await resolveTarget(candidate);
    if (!target) {
      errors.push(`${fileLabel}: broken internal reference "${reference}".`);
      continue;
    }

    if (candidate.hash) {
      const targetHtml = target.endsWith(".html") ? await fs.readFile(target, "utf8") : "";
      if (targetHtml && !idsFor(targetHtml).has(candidate.hash)) {
        errors.push(`${fileLabel}: "${reference}" points to missing anchor #${candidate.hash}.`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Static site check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Static site check passed for ${htmlFiles.length} HTML files.`);
