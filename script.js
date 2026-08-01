// Sesterce — comportements JS minimaux (progressive enhancement)
// Le site fonctionne entièrement sans JavaScript ; ce fichier ne fait
// qu'ajouter des interactions de confort.

(function () {
  "use strict";

  // Menu mobile
  var toggle = document.querySelector(".nav__toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav__links a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Met en pause l'animation de la carte quand elle sort du viewport,
  // pour économiser des cycles sur les pages longues.
  var flipcard = document.querySelector(".flipcard");
  if (flipcard && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          flipcard.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(flipcard);
  }
})();
