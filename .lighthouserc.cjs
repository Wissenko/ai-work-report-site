module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run serve:test",
      startServerReadyPattern: "Available on",
      url: [
        "http://127.0.0.1:4173/index.html",
        "http://127.0.0.1:4173/samples.html",
        "http://127.0.0.1:4173/samples/admin-assistant/",
        "http://127.0.0.1:4173/roles/ai-for-administrative-assistants/",
        "http://127.0.0.1:4173/faq.html"
      ],
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--no-sandbox --disable-dev-shm-usage"
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci"
    }
  }
};
