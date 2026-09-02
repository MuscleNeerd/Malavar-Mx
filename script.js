document.querySelectorAll('[data-clean-logo]').forEach((logo) => {
  const cleanBackground = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = logo.naturalWidth;
      canvas.height = logo.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(logo, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pixels.data.length; i += 4) {
        const brightness = (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
        if (brightness > 238) pixels.data[i + 3] = 0;
        else if (brightness > 215) pixels.data[i + 3] = Math.round((238 - brightness) / 23 * 255);
      }
      logo.src = canvas.toDataURL('image/png');
      logo.classList.add('logo-clean');
    } catch (_) {
      // El archivo sigue siendo visible si el navegador restringe el lienzo local.
      logo.classList.add('logo-clean');
    }
  };
  if (logo.complete) cleanBackground();
  else logo.addEventListener('load', cleanBackground, { once: true });
});

const main = document.querySelector('main');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

document.documentElement.style.overflowY = 'auto';
document.body.style.overflowY = 'auto';

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const recipient = form.dataset.recipient || 's.p.ejecutivo@gmail.com';
  const name = String(data.get('nombre') || '').trim();
  const email = String(data.get('correo') || '').trim();
  const service = String(data.get('servicio') || '').trim();
  const details = String(data.get('mensaje') || '').trim();
  const subject = `Solicitud de reservación${name ? ` · ${name}` : ''}`;
  const body = [
    `Nombre: ${name}`,
    `Correo electrónico: ${email}`,
    `Servicio: ${service}`,
    `Detalles: ${details}`
  ].join('\n');
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  form.querySelector('.form-note').textContent = 'Se abrirá tu correo para enviar la solicitud.';
  form.reset();
  window.location.href = mailto;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

if (main) {
  main.querySelectorAll('section').forEach((section) => section.classList.add('scene'));
}
