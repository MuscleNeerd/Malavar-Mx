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
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const menuBackdrop = document.querySelector('.menu-backdrop');

document.documentElement.style.overflowY = 'auto';
document.body.style.overflowY = 'auto';

const setMenuState = (open, returnFocus = false) => {
  nav?.classList.toggle('open', open);
  header?.classList.toggle('menu-open', open);
  document.body.classList.toggle('mobile-menu-open', open);
  toggle?.setAttribute('aria-expanded', String(open));
  toggle?.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  if (!open && returnFocus) toggle?.focus({ preventScroll: true });
};

toggle?.addEventListener('click', () => {
  setMenuState(!nav?.classList.contains('open'));
});

menuBackdrop?.addEventListener('click', () => setMenuState(false, true));

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuState(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    setMenuState(false, true);
  }
});

window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
  if (event.matches) setMenuState(false);
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

/* Clientes: carrusel de logotipos en tarjetas, con el titular centrado
   encima (formato tomado de la referencia que pasó el cliente).
   Cuadrícula: 2 columnas x 2 filas en móvil, 3 x 2 de tablet en adelante.
   La regla dura: filas x columnas debe ser MENOR que 12. Si los doce
   logotipos caben en una sola vista, Swiper deja snapGrid en 1, marca
   isLocked y el autoplay se congela aunque siga diciendo que corre.
   Se usan 3 columnas y no las 4 de la referencia porque con 4 el logotipo
   dibujado bajaba de 346 px a 231 px de ancho en escritorio.
   fill: 'column' es obligatorio: Swiper avisa de que el modo loop no es
   compatible con grid.fill = 'row'. */
const clientsSwiperEl = document.querySelector('.clients-swiper');

if (clientsSwiperEl && typeof Swiper !== 'undefined') {
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  new Swiper(clientsSwiperEl, {
    slidesPerView: 2,
    slidesPerGroup: 1,
    spaceBetween: 12,
    grid: { rows: 2, fill: 'column' },
    loop: true,
    speed: 850,
    watchOverflow: true,
    autoplay: sinMovimiento ? false : {
      delay: 2600,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.clients-swiper-pagination',
      clickable: true
    },
    breakpoints: {
      761: { slidesPerView: 3, spaceBetween: 18, grid: { rows: 2, fill: 'column' } }
    },
    a11y: {
      enabled: true,
      containerMessage: 'Clientes de Malavar Mx',
      prevSlideMessage: 'Logotipos anteriores',
      nextSlideMessage: 'Logotipos siguientes',
      paginationBulletMessage: 'Ir al grupo de logotipos {{index}}'
    }
  });
}
