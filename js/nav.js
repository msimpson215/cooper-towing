(function () {
  document.querySelectorAll(".nav-toggle").forEach((navToggle) => {
    const navId = navToggle.getAttribute("aria-controls");
    const siteNav = navId ? document.getElementById(navId) : null;

    navToggle.addEventListener("click", () => {
      const open = siteNav?.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(!!open));
    });
  });

  document.querySelectorAll(".nav-dropdown-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const li = btn.closest(".has-dropdown");
      const isOpen = li?.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(!!isOpen));
      e.stopPropagation();
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".has-dropdown.open").forEach((li) => {
      li.classList.remove("open");
      li.querySelector(".nav-dropdown-btn")?.setAttribute("aria-expanded", "false");
    });
  });
})();
