document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const msg  = document.getElementById("formMsg");

  if (!form || !msg) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Desactivar botón para evitar doble envío
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" } // importante para Formspree
      });

      if (response.ok) {
        mostrarMensaje("✅ ¡Gracias! Tu mensaje fue enviado.", "success");
        form.reset();
      } else {
        // Formspree devuelve 422 cuando falta algo
        mostrarMensaje("❌ No se pudo enviar. Revisa los campos e inténtalo de nuevo.", "danger");
      }
    } catch (err) {
      mostrarMensaje("⚠️ Problema de conexión. Vuelve a intentarlo.", "warning");
    } finally {
      // Rehabilitar botón
      submitBtn.disabled = false;
    }
  });

  function mostrarMensaje(texto, tipo) {
    msg.textContent = texto;
    msg.className = `alert alert-${tipo} mt-3`; // quita d-none
    // Ocultar tras 15 segundos
    setTimeout(() => {
      msg.classList.add("d-none");
      msg.textContent = "";
    }, 7000);
  }
});
