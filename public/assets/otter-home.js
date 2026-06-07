/* Otter Homecare — homepage interactions */
(function () {
  "use strict";

  /* ---- mobile nav ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("show");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close on link tap
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("show");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- reveal on scroll (robust: never leaves content hidden) ---- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function revealAll() {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
  function inView(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.92 && r.bottom > 0;
  }

  if (reduced || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });

    // 1) reveal anything already on screen at load, next frame
    requestAnimationFrame(function () {
      revealEls.forEach(function (el) { if (inView(el)) { el.classList.add("in"); } });
    });
    // 2) failsafe: if the observer is throttled/never fires, show everything
    setTimeout(revealAll, 800);
  }

  /* ---- booking form ---- */
  var form = document.getElementById("bookForm");
  var success = document.getElementById("formSuccess");
  if (form && success) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = form.querySelector("#name");
      var phone = form.querySelector("#phone");
      var ok = true;
      [name, phone].forEach(function (f) {
        if (!f.value.trim()) {
          f.style.borderColor = "#C8643C";
          ok = false;
        } else {
          f.style.borderColor = "";
        }
      });
      if (!ok) { return; }
      form.classList.add("hide");
      success.classList.add("show");
      success.scrollIntoView ? null : null; // avoid scrollIntoView per guidance
      // gently bring the confirmation into view via window scroll
      var top = success.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  }
  /* ---- faq accordion ---- */
  var faqBtns = document.querySelectorAll(".faq > button");
  faqBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.parentNode.classList.toggle("open");
    });
  });
})();
