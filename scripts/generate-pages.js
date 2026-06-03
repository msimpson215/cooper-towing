const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const nav = (active) => `<header class="site-header">
  <div class="header-inner">
    <a href="/" class="logo" aria-label="Home">
      <img src="/images/logo.png" alt="" class="logo-mark logo-mark-crop" width="52" height="44">
      <span class="logo-text"><span class="logo-name">Cooper's</span><span class="logo-tagline">AUTOMOTIVE &amp; TOWING</span></span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span><span class="sr-only">Menu</span></button>
    <nav id="site-nav" class="site-nav" aria-label="Main">
      <ul class="nav-list">
        <li><a href="/" class="nav-link${active === "home" ? " active" : ""}">HOME</a></li>
        <li class="has-dropdown">
          <button type="button" class="nav-link nav-dropdown-btn${active.startsWith("towing") ? " active" : ""}" aria-expanded="false">TOWING</button>
          <ul class="dropdown">
            <li><a href="/towing/">All Towing Services</a></li>
            <li><a href="/towing/emergency.html">Emergency Towing 24/7</a></li>
            <li><a href="/towing/flatbed.html">Flatbed Towing</a></li>
            <li><a href="/towing/roadside.html">Roadside Assistance</a></li>
            <li><a href="/towing/accident-recovery.html">Accident Recovery</a></li>
          </ul>
        </li>
        <li class="has-dropdown">
          <button type="button" class="nav-link nav-dropdown-btn${active.startsWith("auto") ? " active" : ""}" aria-expanded="false">AUTOMOTIVE</button>
          <ul class="dropdown">
            <li><a href="/automotive/">All Automotive</a></li>
            <li><a href="/automotive/repairs.html">General Repairs</a></li>
            <li><a href="/automotive/diagnostics.html">Diagnostics</a></li>
            <li><a href="/automotive/brakes.html">Brakes &amp; Suspension</a></li>
            <li><a href="/automotive/maintenance.html">Oil &amp; Maintenance</a></li>
          </ul>
        </li>
        <li><a href="/about.html" class="nav-link${active === "about" ? " active" : ""}">ABOUT</a></li>
        <li><a href="/contact.html" class="nav-link${active === "contact" ? " active" : ""}">CONTACT</a></li>
      </ul>
    </nav>
    <a href="tel:6186718770" class="header-phone"><span class="header-phone-label">CALL NOW 24/7</span><span class="header-phone-number"><svg class="icon-phone" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>618-671-8770</span></a>
  </div>
</header>`;

const footer = `<section class="emergency-strip" aria-label="24/7 dispatch">
  <div class="emergency-strip-inner">
    <p class="emergency-badge">24/7 EMERGENCY · ON-CALL SERVICE</p>
    <p class="emergency-tagline">ONE CALL. WE'LL TAKE CARE OF THE REST.</p>
    <a href="tel:6186718770" class="emergency-phone"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>618-671-8770</a>
  </div>
</section>
<p class="footer-copy">&copy; <span id="year"></span> Cooper's Automotive &amp; Towing.</p>`;

const pages = [
  { folder: "towing", file: "index.html", active: "towing", title: "Towing Services", h1: "Towing Services", lead: "24/7 emergency towing, flatbed transport, accident recovery, and roadside assistance across Metro East & Greater St. Louis.", body: `<div class="service-cards">
    <a class="service-card" href="/towing/emergency.html"><h3>Emergency Towing 24/7</h3><p>Stranded now? Dispatch is on call day and night.</p></a>
    <a class="service-card" href="/towing/flatbed.html"><h3>Flatbed Towing</h3><p>Safe transport for AWD, luxury, and lowered vehicles.</p></a>
    <a class="service-card" href="/towing/roadside.html"><h3>Roadside Assistance</h3><p>Jump starts, lockouts, tire changes, and more.</p></a>
    <a class="service-card" href="/towing/accident-recovery.html"><h3>Accident Recovery</h3><p>Professional scene support when it matters most.</p></a>
  </div><p style="margin-top:1.5rem">Call <a href="tel:6186718770" class="phone-inline">618-671-8770</a> for immediate dispatch.</p>` },
  { folder: "towing", file: "emergency.html", active: "towing", title: "Emergency Towing 24/7", h1: "Emergency Towing 24/7", lead: "On-call emergency service — when you're stranded, we're on the way.", body: `<p>Cooper's dispatches tow trucks around the clock throughout Metro East and Greater St. Louis. One call gets a trained operator and a truck headed your way.</p><h2>We handle</h2><ul><li>Breakdowns on highways and local roads</li><li>Disabled vehicles in parking lots and driveways</li><li>Urgent relocations day or night</li></ul><p><strong>Call now:</strong> <a href="tel:6186718770" class="phone-inline">618-671-8770</a></p>` },
  { folder: "towing", file: "flatbed.html", active: "towing", title: "Flatbed Towing", h1: "Flatbed Towing", lead: "All four wheels off the ground — the safe choice for many vehicles.", body: `<p>Our flatbed trucks protect your vehicle during transport. Ideal for all-wheel drive, SUVs, minivans, and damage-sensitive loads.</p><p>Schedule or request emergency flatbed service: <a href="tel:6186718770" class="phone-inline">618-671-8770</a></p>` },
  { folder: "towing", file: "roadside.html", active: "towing", title: "Roadside Assistance", h1: "Roadside Assistance", lead: "Jump starts, lockouts, tire changes, fuel delivery, and more.", body: `<p>Not every problem needs a full tow. Our roadside team helps you get moving when you're stuck close to home or on the road.</p><ul><li>Jump starts</li><li>Lockout service</li><li>Tire changes</li><li>Fuel delivery</li></ul><p>24/7 roadside: <a href="tel:6186718770" class="phone-inline">618-671-8770</a></p>` },
  { folder: "towing", file: "accident-recovery.html", active: "towing", title: "Accident Recovery", h1: "Accident Recovery", lead: "Professional recovery when accidents happen.", body: `<p>We work with drivers, insurers, and law enforcement to recover vehicles safely from accident scenes. Available 24/7.</p><p>Accident dispatch line: <a href="tel:6186718770" class="phone-inline">618-671-8770</a></p>` },
  { folder: "automotive", file: "index.html", active: "auto", title: "Automotive Service", h1: "Automotive Service", lead: "Repairs and maintenance from the team you trust for towing.", body: `<div class="service-cards">
    <a class="service-card" href="/automotive/repairs.html"><h3>General Repairs</h3><p>Reliable repair work for daily drivers and work vehicles.</p></a>
    <a class="service-card" href="/automotive/diagnostics.html"><h3>Diagnostics</h3><p>Find the problem before it leaves you stranded.</p></a>
    <a class="service-card" href="/automotive/brakes.html"><h3>Brakes &amp; Suspension</h3><p>Safety systems you can count on.</p></a>
    <a class="service-card" href="/automotive/maintenance.html"><h3>Oil &amp; Maintenance</h3><p>Keep your vehicle on the road longer.</p></a>
  </div><p style="margin-top:1.5rem">Questions? Call <a href="tel:6186718770" class="phone-inline">618-671-8770</a> or <a href="/contact.html" class="phone-inline">contact us</a>.</p>` },
  { folder: "automotive", file: "repairs.html", active: "auto", title: "General Repairs", h1: "General Auto Repairs", lead: "From check engine lights to worn components — we help you get back on the road.", body: `<p>Cooper's Automotive handles a wide range of repair work for Metro East and St. Louis drivers. Honest service from a local, family-owned shop.</p><p>Call to schedule: <a href="tel:6186718770" class="phone-inline">618-671-8770</a></p>` },
  { folder: "automotive", file: "diagnostics.html", active: "auto", title: "Diagnostics", h1: "Diagnostics", lead: "Accurate troubleshooting saves time and money.", body: `<p>Modern vehicles need proper diagnostics. We identify issues clearly so you can decide on the right repair.</p><p>Schedule diagnostics: <a href="tel:6186718770" class="phone-inline">618-671-8770</a></p>` },
  { folder: "automotive", file: "brakes.html", active: "auto", title: "Brakes & Suspension", h1: "Brakes &amp; Suspension", lead: "Stopping safely is non-negotiable.", body: `<p>Brakes, shocks, struts, and suspension components affect every mile you drive. We'll inspect and recommend what your vehicle needs.</p><p>Call <a href="tel:6186718770" class="phone-inline">618-671-8770</a></p>` },
  { folder: "automotive", file: "maintenance.html", active: "auto", title: "Oil & Maintenance", h1: "Oil &amp; Maintenance", lead: "Routine care that prevents breakdowns.", body: `<p>Oil changes, filters, fluids, and scheduled maintenance help avoid costly surprises. Ask about our maintenance services.</p><p>Phone: <a href="tel:6186718770" class="phone-inline">618-671-8770</a></p>` },
];

for (const p of pages) {
  const dir = path.join(root, p.folder);
  fs.mkdirSync(dir, { recursive: true });
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${p.lead.replace(/"/g, "&quot;")} Call 618-671-8770.">
  <title>${p.title} | Cooper's Automotive & Towing</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Pacifico&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/pages.css">
</head>
<body>
${nav(p.active)}
<main>
  <section class="page-hero">
    <div class="page-hero-inner">
      <h1>${p.h1}</h1>
      <p class="page-hero-lead">${p.lead}</p>
      <div class="page-cta-row">
        <a href="tel:6186718770" class="btn btn-call">CALL 618-671-8770</a>
        <a href="/contact.html" class="btn btn-service">REQUEST SERVICE</a>
      </div>
    </div>
  </section>
  <div class="landing-content">${p.body}</div>
  ${footer}
</main>
<script src="/js/nav.js"></script>
<script src="/js/main.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, p.file), html);
  console.log("wrote", p.folder + "/" + p.file);
}
