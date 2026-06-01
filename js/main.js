(function () {
  const PHONE = "6186718770";
  const DISPATCH_EMAIL = ""; // e.g. dispatch@cooperstowing.com — leave empty to use SMS-style mailto only

  document.getElementById("year").textContent = new Date().getFullYear();

  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  navToggle?.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav-dropdown-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const li = btn.closest(".has-dropdown");
      const isOpen = li.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
      e.stopPropagation();
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".has-dropdown.open").forEach((li) => {
      li.classList.remove("open");
      li.querySelector(".nav-dropdown-btn")?.setAttribute("aria-expanded", "false");
    });
  });

  const modal = document.getElementById("service-modal");
  const serviceForm = document.getElementById("service-form");
  const modalSuccess = document.getElementById("modal-success");

  function openModal() {
    modal.hidden = false;
    serviceForm.hidden = false;
    modalSuccess.hidden = true;
    serviceForm.reset();
    document.body.style.overflow = "hidden";
    modal.querySelector("input, select, textarea")?.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open-modal]").forEach((el) => {
    el.addEventListener("click", openModal);
  });

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  serviceForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(serviceForm);
    const name = data.get("name");
    const phone = data.get("phone");
    const location = data.get("location");
    const service = data.get("service");
    const details = data.get("details") || "(none)";

    const subject = encodeURIComponent("Service Request — Cooper's Towing");
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nLocation: ${location}\nService: ${service}\nDetails: ${details}\n\nSent from cooper-towing website`
    );

    if (DISPATCH_EMAIL) {
      try {
        await fetch(`https://formsubmit.co/ajax/${DISPATCH_EMAIL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: "Service Request — Cooper's Towing",
            name,
            phone,
            location,
            service,
            details,
          }),
        });
      } catch {
        window.location.href = `mailto:${DISPATCH_EMAIL}?subject=${subject}&body=${body}`;
      }
    } else {
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    serviceForm.hidden = true;
    modalSuccess.hidden = false;
  });

  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent("Website Contact — Cooper's Towing");
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`
    );
    const to = DISPATCH_EMAIL || "";
    window.location.href = to
      ? `mailto:${to}?subject=${subject}&body=${body}`
      : `mailto:?subject=${subject}&body=${body}`;
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      siteNav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
})();
