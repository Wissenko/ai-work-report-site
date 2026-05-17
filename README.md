# Your AI Work Plan

Static landing site for the independent Your AI Work Plan paid report test.

## Pages

- `index.html` - main landing page
- `samples.html` - sample report index
- `samples.html` - sample report hub
- `samples/<role>/index.html` - role-specific sample reports
- `roles/index.html` - role guide hub
- `roles/ai-for-*/index.html` - role-specific SEO guide pages
- `methodology.html` - how the report is made
- `privacy.html` - plain-English privacy page
- `sitemap.xml` - indexable marketing pages
- `robots.txt` - crawler rules for marketing and private/internal paths
- `assets/og/*.svg` - social preview images

## Generators

```bash
node scripts/generate-sample-reports.mjs
node scripts/apply-seo-pass.mjs
```

Run the SEO pass after regenerating sample reports so metadata, breadcrumbs,
role guides, sitemap, robots, and OpenGraph images stay in sync.

## Local Preview

Run a static server from this folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

CTA links are placeholders for now and use `#`.
