/* ===== Wisdom Education Centre — common script ===== */

/* ---------- SETTINGS: sirf yahan badlo ---------- */
const SCHOOL = {
  name: "Wisdom Education Centre",
  address: "1642, Saraswati Nagar, Hamirpur Rd, Naubasta, Kanpur, Uttar Pradesh 208021",
  phone: "+91 63876 44719",
  phoneLink: "+916387644719",
  hours: "Mon–Sat, 8:00 AM – 2:00 PM",
  map: "https://maps.app.goo.gl/XWjU6KH8HaLCxRtP8",
  whatsapp: "",   // WhatsApp number with country code, e.g. "919876543210"
  sheetUrl: ""    // Google Apps Script Web App URL (form entries -> Google Sheet)
};

/* Notices: naya notice sabse upar jodo */
const NOTICES = [
  { date: "2026-10-18", title: "Online admission enquiry", text: "Parents can now send admission enquiries online through the Admission page or call the school office." }
];
/* ------------------------------------------------ */

const ICONS = {
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
};

const PAGES = [
  ["index.html", "Home"],
  ["about.html", "About Us"],
  ["academics.html", "Academics"],
  ["admission.html", "Admissions"],
  ["gallery.html", "Gallery"],
  ["notices.html", "Notices"],
  ["contact.html", "Contact"]
];

const current = location.pathname.split("/").pop() || "index.html";
const isActive = f => (current === f || (current === "" && f === "index.html") || current === f.replace(".html", "")) ? "active" : "";

/* Top bar + header */
document.getElementById("site-header").innerHTML = `
  <div class="topbar"><div class="container">
    <div class="info">
      <span>${ICONS.pin} Saraswati Nagar, Naubasta, Kanpur</span>
      <span>${ICONS.phone} ${SCHOOL.phone}</span>
      <span>${ICONS.clock} ${SCHOOL.hours}</span>
    </div>
  </div></div>
  <header class="header"><div class="container">
    <a href="index.html" class="logo">
      <span class="logo-badge">W</span>
      <span class="logo-text"><b>WISDOM</b><small>Education Centre</small></span>
    </a>
    <nav class="nav" id="nav">
      ${PAGES.map(([f, n]) => `<a href="${f}" class="${isActive(f)}">${n}</a>`).join("")}
    </nav>
    <a href="admission.html" class="btn btn-gold">Apply Now</a>
    <button class="menu-btn" id="menuBtn" aria-label="Open menu">${ICONS.menu}</button>
  </div></header>`;

/* Footer */
document.getElementById("site-footer").innerHTML = `
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <a href="index.html" class="logo"><span class="logo-badge">W</span>
        <span class="logo-text"><b>WISDOM</b><small>Education Centre</small></span></a>
        <p>A school in Naubasta, Kanpur, welcoming families from Saraswati Nagar and nearby areas.</p>
      </div>
      <div><h4>Quick Links</h4><ul>
        ${PAGES.slice(0, 4).map(([f, n]) => `<li><a href="${f}">${n}</a></li>`).join("")}
      </ul></div>
      <div><h4>More</h4><ul>
        ${PAGES.slice(4).map(([f, n]) => `<li><a href="${f}">${n}</a></li>`).join("")}
      </ul></div>
      <div><h4>Contact</h4><ul>
        <li>${SCHOOL.address}</li>
        <li><a href="tel:${SCHOOL.phoneLink}">${SCHOOL.phone}</a></li>
        <li>${SCHOOL.hours}</li>
        <li><a href="${SCHOOL.map}" target="_blank" rel="noopener">Open in Google Maps</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">© ${new Date().getFullYear()} ${SCHOOL.name}. All rights reserved.</div>
  </footer>`;

/* Mobile menu */
document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

/* Notices (any page with #noticeList) */
const noticeList = document.getElementById("noticeList");
if (noticeList) {
  const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const limit = Number(noticeList.dataset.limit || NOTICES.length);
  noticeList.innerHTML = NOTICES.slice(0, limit).map(n => {
    const d = new Date(n.date + "T00:00:00");
    return `<div class="notice">
      <div class="notice-date"><b>${d.getDate()}</b>${M[d.getMonth()]} ${d.getFullYear()}</div>
      <div><h3>${n.title}</h3><p style="color:var(--muted)">${n.text}</p></div>
    </div>`;
  }).join("");
}

/* Forms (admission + contact) */
document.querySelectorAll("form[data-form]").forEach(form => {
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.className = "form-status err";
      status.textContent = "Please fill in all required fields correctly.";
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    data.formType = form.dataset.form;

    if (SCHOOL.sheetUrl) {
      try {
        await fetch(SCHOOL.sheetUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) });
        form.reset();
        status.className = "form-status ok";
        status.textContent = "Thank you! Your message has been sent to the school.";
        return;
      } catch (err) { /* WhatsApp fallback below */ }
    }
    if (SCHOOL.whatsapp) {
      const lines = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.open(`https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(lines)}`, "_blank");
      status.className = "form-status ok";
      status.textContent = "WhatsApp is opening. Please press send there.";
      return;
    }
    status.className = "form-status err";
    status.textContent = `Online form is not connected yet. Please call ${SCHOOL.phone}.`;
  });
});
