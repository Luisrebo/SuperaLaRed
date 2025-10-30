// === Carga del navbar (HTML en la raíz) ===
document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  fetch('navbar.html', { cache: 'no-cache' })
    .then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(html => {
      placeholder.innerHTML = html;
      initAccessibilityButton();        // ← inserta el botón
      highlightActiveLink();            // ← resalta después de inyectar
    })
    .catch(err => console.error('Error cargando navbar:', err));
});

// === Botón modo accesible ===
function initAccessibilityButton() {
  const nav = document.querySelector('.navbar .navbar-nav');
  if (!nav) return;

  const li = document.createElement('li');
  li.className = 'nav-item nav-item-accessible';

  /* En móvil:
     - w-100: ocupa el ancho del menú colapsado
     - ms-0: elimina margen izquierdo
     En desktop (>= lg):
     - w-lg-auto: ancho natural
     - ms-lg-2: margen izquierdo suave
     Etiqueta:
     - oculta en lg con d-none d-xl-inline para ahorrar espacio,
       reaparece en pantallas grandes (>= xl) */
  li.innerHTML = `
    <button id="toggle-accessible"
            class="btn btn-outline-light btn-sm d-inline-flex align-items-center
                   w-100 w-lg-auto ms-0 ms-lg-2">
      <i class="bi bi-eye"></i>
      <span class="acc-label ms-1 d-none d-xl-inline">Modo Accesible</span>
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
  const current = raw === '' ? 'index.html' : raw;

  const links = document.querySelectorAll('.navbar a.nav-link');
  let matched = null;

  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    // Ignorar externos / tel / whatsapp / mailto
    if (/^(https?:|tel:|mailto:|wa\.me|https:\/\/wa\.me)/i.test(href)) return;

    const linkFile = href.split('/').pop().split('#')[0] || 'index.html';
    if (linkFile === current) matched = link;

    if (!matched && current === 'index.html' && href.startsWith('index.html#')) {
      matched = link;
    }
  });

  if (matched) {
    matched.classList.add('active-page');
    matched.setAttribute('aria-current', 'page');
  }
}
