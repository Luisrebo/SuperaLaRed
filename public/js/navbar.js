// === Carga dinámica del navbar y resalta la página activa ===
document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");
  if (!placeholder) return;

  // Como los HTML están en la raíz, el navbar está en ./navbar.html
  fetch("navbar.html", { cache: "no-cache" })
    .then(res => res.ok ? res.text() : Promise.reject(res.status))
    .then(html => {
      placeholder.innerHTML = html;
      highlightActiveLink(); // ejecutar después de cargar
    })
    .catch(err => console.error("Error cargando navbar:", err));
});

// --- Función para resaltar el enlace activo ---
function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".navbar .nav-link");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    const normalizedHref = href.split("/").pop(); // elimina rutas
    if (normalizedHref === currentPage) {
      link.classList.add("active-page");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active-page");
      link.removeAttribute("aria-current");
    }
  });
}
