// === Carga del navbar (HTML en la raíz) ===
document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  fetch('navbar.html', { cache: 'no-cache' })   // <— IMPORTANTE: sin barra inicial
    .then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(html => {
      placeholder.innerHTML = html;
      initAccessibilityButton();
      highlightActiveLink();                    // <— resalta después de inyectar
    })
    .catch(err => console.error('Error cargando navbar:', err));
});

// === Botón modo accesible ===
function initAccessibilityButton() {
  const nav = document.querySelector('.navbar .navbar-nav');
  if (!nav) return;

  const li = document.createElement('li');
  li.className = 'nav-item';

  // icono + etiqueta responsive (la etiqueta se oculta en lg)
  li.innerHTML = `
    <button id="toggle-accessible" class="btn btn-outline-light btn-sm ms-2">
      <i class="bi bi-eye"></i>
      <span class="acc-label ms-1">Modo Accesible</span>
    </button>
  `;
  nav.appendChild(li);

  document.getElementById('toggle-accessible')
    .addEventListener('click', () => {
      document.body.classList.toggle('accessible-mode');
    });
}

// === Resaltar enlace activo ===
function highlightActiveLink() {
  const raw = window.location.pathname.split('/').pop();
  // Soporta visitar "/" (sin index.html)
  const current = raw === '' ? 'index.html' : raw;

  const links = document.querySelectorAll('.navbar a.nav-link');
  let matched = null;

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    // Ignorar externos / tel / whatsapp
    if (/^(https?:|tel:|mailto:|wa\.me|https:\/\/wa\.me)/i.test(href)) return;

    const linkFile = href.split('/').pop().split('#')[0] || 'index.html';
    if (linkFile === current) matched = link;

    // caso especial: estás en index.html y el link es index.html#algo
    if (!matched && current === 'index.html' && href.startsWith('index.html#')) {
      matched = link;
    }
  });

  if (matched) {
    matched.classList.add('active-page');
    matched.setAttribute('aria-current', 'page');
  }
}
