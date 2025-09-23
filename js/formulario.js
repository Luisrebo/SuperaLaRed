document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const msg  = document.getElementById("formMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita recarga

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    })
    .then(response => {
      if (response.ok) {
        mostrarMensaje("✅ ¡Gracias! Tu mensaje fue enviado.", "success");
        form.reset();
      } else {
        mostrarMensaje("❌ Error al enviar. Intenta de nuevo.", "danger");
      }
    })
    .catch(() => {
      mostrarMensaje("⚠️ Problema de conexión. Vuelve a intentarlo.", "warning");
    });
  });

  function mostrarMensaje(texto, tipo) {
    msg.textContent = texto;
    msg.className = `alert alert-${tipo} mt-3`;

    // Oculta el mensaje tras 15 segundos
    setTimeout(() => {
      msg.classList.add("d-none");
      msg.textContent = "";
    }, 7000);
  }
});
