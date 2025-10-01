document.addEventListener('DOMContentLoaded', () => {
  const contacto = document.getElementById('contacto');
  // Añadimos la clase hidden en cuanto carga
  contacto.classList.add('hidden');

  // Cuando todo el contenido está listo (puedes usar un pequeño delay)
  window.addEventListener('load', () => {
    setTimeout(() => {
      contacto.classList.add('visible');
      contacto.classList.remove('hidden');
    }, 1500); // retardo opcional para suavidad
  });
});
