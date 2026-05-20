(function () {
  const config = window.__GROWTH_POSTHOG_CONFIG__ || {};
  const projectToken = config.projectToken;
  const apiHost = config.host || "https://us.i.posthog.com";

  if (!projectToken) {
    window.__growthAnalyticsDisabled = true;
    return;
  }

  function normalizePath(pathname) {
    let path = pathname || "/";

    if (path.endsWith("/index.html")) {
      path = path.slice(0, -"/index.html".length) || "/";
    } else if (path.endsWith(".html")) {
      path = path.slice(0, -".html".length) || "/";
    }

    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    return path || "/";
  }

  function pageType(pathname) {
    if (pathname === "/") return "homepage";
    if (pathname === "/roles") return "role_index";
    if (pathname.startsWith("/roles/")) return "role_page";
    if (pathname === "/samples") return "sample_index";
    if (pathname.startsWith("/samples/")) return "sample_report";
    if (pathname === "/what-you-get") return "value_page";
    if (pathname === "/how-it-works") return "how_it_works";
    if (pathname === "/methodology") return "methodology";
    if (pathname === "/faq") return "faq";
    if (pathname === "/privacy") return "privacy";

    return "marketing_page";
  }

  function contentId(pathname) {
    if (pathname === "/") return "home";

    return pathname.slice(1).replaceAll("/", ":");
  }

  function sourceAssetId(pathname) {
    const id = contentId(pathname);

    if (pathname.startsWith("/roles/")) return `aiwr:role:${id.split(":").pop()}`;
    if (pathname.startsWith("/samples/")) return `aiwr:sample:${id.split(":").pop()}`;

    return `aiwr:${id}`;
  }

  function isProductionHost(hostname) {
    return (
      hostname === "ai-work-report-site.vercel.app" ||
      hostname === "ai-work-report-site-fathallahwissem-1387s-projects.vercel.app"
    );
  }

  function environment(hostname) {
    if (hostname === "localhost" || hostname === "127.0.0.1") return "development";
    if (isProductionHost(hostname)) return "production";
    if (hostname.endsWith(".vercel.app")) return "preview";

    return "production";
  }

  function isInternalTraffic(url) {
    const hostname = url.hostname;

    return (
      url.searchParams.get("growth_internal") === "1" ||
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      (hostname.endsWith(".vercel.app") && !isProductionHost(hostname))
    );
  }

  function compactText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function growthProperties() {
    const url = new URL(window.location.href);
    const pathname = normalizePath(url.pathname);
    const properties = {
      growth_os_version: "posthog-web-v1",
      venture_id: "ai-work-report",
      site_id: "ai-work-report-site",
      traffic_surface: "marketing_site",
      page_type: pageType(pathname),
      source_asset_id: sourceAssetId(pathname),
      content_id: contentId(pathname),
      is_internal: isInternalTraffic(url),
      environment: environment(url.hostname),
      utm_source: url.searchParams.get("utm_source"),
      utm_medium: url.searchParams.get("utm_medium"),
      utm_campaign: url.searchParams.get("utm_campaign"),
      utm_term: url.searchParams.get("utm_term"),
      utm_content: url.searchParams.get("utm_content")
    };

    Object.keys(properties).forEach((key) => {
      if (properties[key] === null || properties[key] === undefined) {
        delete properties[key];
      }
    });

    return properties;
  }

  function enrichEvent(event) {
    if (!event) return event;

    event.properties = Object.assign({}, growthProperties(), event.properties || {});
    return event;
  }

  function isTrackableCta(anchor) {
    if (!anchor) return false;
    if (anchor.closest(".doc-nav")) return false;

    const href = anchor.getAttribute("href") || "";
    return (
      anchor.matches(".button, .mobile-menu-cta") ||
      Boolean(anchor.closest(".section-cta, .final-cta, .sticky-report-cta, .cta-panel")) ||
      href.includes("#pricing")
    );
  }

  function ctaSurface(anchor) {
    if (anchor.closest(".sticky-report-cta")) return "sticky_report_cta";
    if (anchor.closest(".final-cta")) return "final_cta";
    if (anchor.closest(".section-cta")) return "section_cta";
    if (anchor.closest(".cta-panel")) return "cta_panel";
    if (anchor.classList.contains("mobile-menu-cta")) return "mobile_nav";
    if (anchor.classList.contains("button-small")) return "desktop_nav";

    return "body";
  }

  function trackCtas() {
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest("a");
      if (!isTrackableCta(anchor) || !window.posthog) return;

      window.posthog.capture("growth_cta_clicked", Object.assign({}, growthProperties(), {
        cta_event: "static_site_cta_click",
        cta_text: compactText(anchor.textContent || ""),
        cta_href: anchor.getAttribute("href") || "",
        cta_surface: ctaSurface(anchor)
      }));
    });
  }

  function initPostHog() {
    if (!window.posthog || !window.posthog.init) return;

    window.posthog.init(projectToken, {
      api_host: apiHost,
      defaults: "2026-01-30",
      capture_pageview: false,
      autocapture: false,
      disable_session_recording: true,
      request_batching: false,
      before_send: enrichEvent
    });
    window.posthog.register(growthProperties());
    trackCtas();
    window.posthog.capture("$pageview", growthProperties());
  }

  const script = document.createElement("script");
  script.src = `${apiHost}/static/array.js`;
  script.async = true;
  script.onload = initPostHog;
  document.head.appendChild(script);
})();
