import { pages } from "../../data/pages.js";
import { projects } from "../../data/projects.js";
import { notes } from "../../data/notes.js";
import { site } from "../../data/site.js";

export function renderPage(slug) {
  const page = pages.find((item) => item.slug === slug);
  const root = document.querySelector("#pageRoot");
  if (!root) return;

  if (!page) {
    root.innerHTML = renderNotFound();
    return;
  }

  document.title = `${page.title} // ${site.shortName}`;
  updateMeta(page);
  root.innerHTML = renderTemplate(page);
}

function renderTemplate(page) {
  switch (page.type) {
    case "home": return renderHome(page);
    case "work": return renderWork(page);
    case "projects": return renderProjects(page);
    case "project": return renderProject(page);
    case "about": return renderAbout(page);
    case "process": return renderProcess(page);
    case "services": return renderServices(page);
    case "contact": return renderContact(page);
    case "resume": return renderResume(page);
    case "notes": return renderNotes(page);
    case "note": return renderNote(page);
    case "faq": return renderFaq(page);
    case "uses": return renderUses(page);
    case "press": return renderPress(page);
    case "colophon": return renderColophon(page);
    case "sitemap": return renderSitemap(page);
    case "status": return renderStatus(page);
    default: return renderGeneric(page);
  }
}

function renderHome(page) {
  return `
    <section class="hero">
      <p class="eyebrow">${escapeHtml(page.label)}</p>
      <h1>MKA·5D Omni-Sphere Portfolio</h1>
      <p class="lede">${escapeHtml(site.description)}</p>
      <div class="actions">
        <a class="btn btn-solid" href="/work.html">See work</a>
        <a class="btn btn-ghost" href="/contact.html">Contact</a>
      </div>
    </section>

    <section class="grid-cards">
      ${projects.map(renderProjectCard).join("")}
    </section>
  `;
}

function renderWork() {
  return `
    <section class="page-head">
      <h1>Selected Work</h1>
      <p>Three focused case studies with realistic problem framing.</p>
    </section>

    <section class="timeline-list">
      ${projects.map(renderTimelineRow).join("")}
    </section>
  `;
}

function renderProjects() {
  return `
    <section class="page-head">
      <h1>Project Index</h1>
      <p>All showcase projects in one view.</p>
    </section>

    <section class="grid-cards">
      ${projects.map(renderProjectCard).join("")}
    </section>
  `;
}

function renderProject(page) {
  const project = projects.find((item) => item.id === page.projectId);
  if (!project) return renderNotFound();

  return `
    <article class="case-study">
      <header class="case-hero">
        <p class="eyebrow">${escapeHtml(page.label)}</p>
        <h1>${escapeHtml(project.title)}</h1>
        <p class="lede">${escapeHtml(project.summary)}</p>
      </header>

      <section class="facts">
        <div><span>Category</span><strong>${escapeHtml(project.category)}</strong></div>
        <div><span>Year</span><strong>${escapeHtml(project.year)}</strong></div>
        <div><span>Status</span><strong>${escapeHtml(project.status)}</strong></div>
      </section>

      <section class="content-block">
        <h2>The problem</h2>
        <p>${escapeHtml(project.problem)}</p>
      </section>

      <section class="content-block">
        <h2>The approach</h2>
        <p>${escapeHtml(project.approach)}</p>
      </section>

      <section class="content-block">
        <h2>Decisions</h2>
        <ul>${project.decisions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </section>

      <section class="content-block">
        <h2>Outcome</h2>
        <p>${escapeHtml(project.outcome)}</p>
      </section>
    </article>
  `;
}

function renderAbout() {
  return `
    <section class="page-head">
      <h1>About</h1>
      <p>Background, approach and working style.</p>
    </section>

    <section class="content-block">
      <p>I build Android and web products with an emphasis on clarity, system thinking and usable detail.</p>
    </section>
  `;
}

function renderProcess() {
  return `
    <section class="page-head">
      <h1>Process</h1>
      <p>Clarify, shape, ship.</p>
    </section>

    <section class="steps">
      <article><span>01</span><h2>Clarify</h2><p>Understand the problem and the constraints.</p></article>
      <article><span>02</span><h2>Shape</h2><p>Define information architecture and interaction.</p></article>
      <article><span>03</span><h2>Ship</h2><p>Build, test and refine the result.</p></article>
    </section>
  `;
}

function renderServices() {
  return `
    <section class="page-head">
      <h1>Services</h1>
      <p>Product and engineering collaboration.</p>
    </section>

    <section class="steps">
      <article><span>01</span><h2>Android engineering</h2><p>Kotlin, Compose and mobile architecture.</p></article>
      <article><span>02</span><h2>Product systems</h2><p>Information design and interface systems.</p></article>
      <article><span>03</span><h2>AI experiences</h2><p>Transparent, user-controlled AI interactions.</p></article>
    </section>
  `;
}

function renderContact() {
  return `
    <section class="contact">
      <h1>Bring a hard problem.</h1>
      <p>Thoughtful product work, Android systems and intelligent interfaces.</p>
      <a class="btn btn-solid" href="mailto:${site.email}">${site.email}</a>
    </section>
  `;
}

function renderResume() {
  return `
    <section class="page-head">
      <h1>Resume</h1>
      <p>Experience and selected skills.</p>
    </section>

    <section class="content-block">
      <p>Android, web, product thinking, system design, interface systems.</p>
      <a class="btn btn-solid" href="/assets/resume.pdf" download>Download PDF</a>
    </section>
  `;
}

function renderNotes() {
  return `
    <section class="page-head">
      <h1>Notes</h1>
      <p>Short writing on product and engineering.</p>
    </section>

    <section class="signal-list">
      ${notes.map((note) => `
        <a href="${note.href}">
          <strong>${escapeHtml(note.title)}</strong>
          <span>${escapeHtml(note.date)}</span>
        </a>
      `).join("")}
    </section>
  `;
}

function renderNote(page) {
  const note = notes.find((item) => item.id === page.noteId);
  if (!note) return renderNotFound();

  return `
    <article class="article">
      <header class="page-head">
        <h1>${escapeHtml(note.title)}</h1>
        <p>${escapeHtml(note.summary)}</p>
      </header>

      ${note.sections.map((section, index) => `
        <section class="content-block">
          <h2>${String(index + 1).padStart(2, "0")} / ${escapeHtml(section.heading)}</h2>
          <p>${escapeHtml(section.body)}</p>
        </section>
      `).join("")}
    </article>
  `;
}

function renderFaq() {
  return `
    <section class="page-head">
      <h1>FAQ</h1>
      <p>Common questions about collaboration.</p>
    </section>

    <section class="faq">
      <details><summary>What work do you take?</summary><p>Selected product and engineering work.</p></details>
      <details><summary>Do you work remotely?</summary><p>Yes, with clear written communication.</p></details>
      <details><summary>How do we start?</summary><p>Send the problem, scope and timeline.</p></details>
    </section>
  `;
}

function renderUses() {
  return `
    <section class="page-head">
      <h1>Uses</h1>
      <p>Hardware and software setup.</p>
    </section>

    <section class="content-block">
      <p>Laptop, Android device, code editor, browser, notes app and design tools.</p>
    </section>
  `;
}

function renderPress() {
  return `
    <section class="page-head">
      <h1>Press Kit</h1>
      <p>Bio, avatar and downloadable assets.</p>
    </section>
  `;
}

function renderColophon() {
  return `
    <section class="page-head">
      <h1>Colophon</h1>
      <p>Built as a semantic, accessible static portfolio.</p>
    </section>
  `;
}

function renderSitemap() {
  return `
    <section class="page-head">
      <h1>Sitemap</h1>
      <p>All pages in the system.</p>
    </section>

    <section class="signal-list">
      ${pages.map((page) => `
        <a href="${page.path}">
          <strong>${escapeHtml(page.title)}</strong>
          <span>${escapeHtml(page.label)}</span>
        </a>
      `).join("")}
    </section>
  `;
}

function renderStatus() {
  return `
    <section class="page-head">
      <h1>System Status</h1>
      <p>All systems nominal.</p>
    </section>
  `;
}

function renderGeneric(page) {
  return `
    <section class="page-head">
      <h1>${escapeHtml(page.title)}</h1>
      <p>${escapeHtml(page.description)}</p>
    </section>
  `;
}

function renderTimelineRow(project) {
  return `
    <article class="timeline-row">
      <span>${escapeHtml(project.number)}</span>
      <div>
        <h2>${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.summary)}</p>
      </div>
      <a href="${escapeHtml(project.href)}">Open ↗</a>
    </article>
  `;
}

function renderProjectCard(project) {
  return `
    <article class="project-card">
      <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)} preview" loading="lazy">
      <div>
        <p class="eyebrow">${escapeHtml(project.category)}</p>
        <h2>${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.summary)}</p>
        <a class="btn btn-ghost" href="${escapeHtml(project.href)}">Read case study</a>
      </div>
    </article>
  `;
}

function updateMeta(page) {
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", page.description);
}

function renderNotFound() {
  return `
    <section class="page-head">
      <h1>Wrong dimension</h1>
      <p>This route does not exist.</p>
    </section>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
