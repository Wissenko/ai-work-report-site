document.documentElement.classList.add("js-ready");

const navShell = document.querySelector(".nav-shell");
const menuButton = document.querySelector(".mobile-toggle");

if (navShell && menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = navShell.getAttribute("data-open") === "true";
    navShell.setAttribute("data-open", String(!isOpen));
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    document.body.classList.toggle("nav-open", !isOpen);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    navShell?.setAttribute("data-open", "false");
    menuButton?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const docLinks = Array.from(document.querySelectorAll(".doc-nav a"));
const docSections = Array.from(document.querySelectorAll(".doc-section[id]"));

if (docLinks.length && docSections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      docLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-20% 0px -68% 0px", threshold: [0, 0.2, 0.6, 1] }
  );

  docSections.forEach((section) => observer.observe(section));
}
