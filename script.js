import { renderPage } from "./src/render/page-renderer.js";

const pageRoot = document.querySelector("#pageRoot");
const slug = pageRoot?.dataset.pageSlug || "home";

renderPage(slug);
initTheme();
initProgress();

function initTheme() {
  const button = document.querySelector("#themeToggle");
  const key = "mka5d-theme";
  const saved = localStorage.getItem(key) || "dark";
  apply(saved);

  button?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    apply(next);
    localStorage.setItem(key, next);
  });

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    if (button) {
      button.textContent = theme === "dark" ? "Light" : "Dark";
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }
}

function initProgress() {
  const bar = document.createElement("div");
  bar.className = "reading-progress";
  document.body.appendChild(bar);

  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}
