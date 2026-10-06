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

/* Faros interactivos: coordenadas relativas a assets/nueva-portada.png.
   Se recalcula el recorte de object-fit: cover para conservar la alineación. */
(() => {
  const opening = document.querySelector('.fleet-opening');
  const photo = opening?.querySelector('img');
  const canvas = opening?.querySelector('.fleet-lights');
  const context = canvas?.getContext('2d');
  if (!photo || !context) return;

  const interactive = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const headlights = [[.088, .588], [.269, .588], [.396, .603], [.591, .603], [.722, .606], [.913, .606]];
  let width = 0;
  let height = 0;
  let lamps = [];
  let visible = false;
  let active = false;
  let intensity = 0;
  let frame = 0;
  let previousTime = 0;
  const target = { x: .5, y: .75 };
  const current = { ...target };

  function measure() {
    const bounds = canvas.getBoundingClientRect();
    const imageBounds = photo.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    if (!width || !height || !photo.naturalWidth) return;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    const scale = Math.max(imageBounds.width / photo.naturalWidth, imageBounds.height / photo.naturalHeight);
    const imageWidth = photo.naturalWidth * scale;
    const imageHeight = photo.naturalHeight * scale;
    const position = getComputedStyle(photo).objectPosition.split(' ').map(value => parseFloat(value) / 100);
    const offsetX = imageBounds.left - bounds.left + (imageBounds.width - imageWidth) * position[0];
    const offsetY = imageBounds.top - bounds.top + (imageBounds.height - imageHeight) * position[1];
    lamps = headlights.map(([x, y]) => ({ x: offsetX + x * imageWidth, y: offsetY + y * imageHeight }));
    if (intensity > 0) start();
  }

  function glow(x, y, radius, opacity, stretch = 1) {
    context.save();
    context.translate(x, y);
    context.scale(stretch, 1);
    const gradient = context.createRadialGradient(0, 0, 0, 0, 0, radius);
    gradient.addColorStop(0, `rgba(224,242,255,${opacity})`);
    gradient.addColorStop(.18, `rgba(159,206,249,${opacity * .45})`);
    gradient.addColorStop(1, 'rgba(104,172,239,0)');
    context.fillStyle = gradient;
    context.fillRect(-radius, -radius, radius * 2, radius * 2);
    context.restore();
  }

  function draw(time) {
    frame = 0;
    if (!interactive.matches || !visible || document.hidden) return reset();
    const elapsed = Math.min(time - (previousTime || time - 16), 50);
    previousTime = time;
    const ease = 1 - Math.exp(-elapsed / 125);
    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;
    intensity += ((active ? 1 : 0) - intensity) * (1 - Math.exp(-elapsed / 220));
    context.clearRect(0, 0, width, height);
    const x = current.x * width;
    const y = current.y * height;
    const size = Math.min(width, height);
    context.globalCompositeOperation = 'lighter';
    glow(x, y, size * .32, intensity * .09, 1.5);

    lamps.forEach(lamp => {
      if (lamp.x < 0 || lamp.x > width || lamp.y < 0 || lamp.y > height) return;
      const distance = Math.hypot(x - lamp.x, y - lamp.y);
      const length = Math.min(Math.max(distance, size * .28), width * .65);
      context.save();
      context.translate(lamp.x, lamp.y);
      context.rotate(Math.atan2(y - lamp.y, x - lamp.x));
      // Capas translúcidas suavizan los bordes de cada haz.
      for (let layer = 0; layer < 5; layer++) {
        const spread = length * (.08 + layer * .025);
        const beam = context.createLinearGradient(0, 0, length, 0);
        beam.addColorStop(0, `rgba(219,239,255,${intensity * .047})`);
        beam.addColorStop(.25, `rgba(164,206,245,${intensity * .019})`);
        beam.addColorStop(1, 'rgba(110,177,241,0)');
        context.fillStyle = beam;
        context.beginPath();
        context.moveTo(0, -2);
        context.lineTo(length, -spread);
        context.quadraticCurveTo(length * 1.08, 0, length, spread);
        context.lineTo(0, 2);
        context.closePath();
        context.fill();
      }
      context.restore();
      glow(lamp.x, lamp.y, size * .05, intensity * .6);
      glow(lamp.x, lamp.y, size * .027, intensity * .48, 2.6);
    });

    const moving = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > .0001;
    if (moving || Math.abs((active ? 1 : 0) - intensity) > .002) start();
    else if (!active) context.clearRect(0, 0, width, height);
  }

  function start() {
    if (!frame && interactive.matches && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }

  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    active = false;
    intensity = 0;
    context.clearRect(0, 0, width, height);
  }

  function follow(event) {
    if (event.pointerType === 'touch' || !interactive.matches || document.hidden) return;
    const bounds = opening.getBoundingClientRect();
    target.x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    target.y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    if (!active) {
      measure();
      current.x = target.x;
      current.y = target.y;
      previousTime = 0;
    }
    active = true;
    start();
  }

  opening.addEventListener('pointermove', follow, { passive: true });
  opening.addEventListener('pointerleave', () => { active = false; start(); });
  opening.addEventListener('pointercancel', reset);
  window.addEventListener('blur', reset);
  document.addEventListener('visibilitychange', reset);
  interactive.addEventListener('change', () => { reset(); measure(); });
  photo.addEventListener('load', measure);
  photo.addEventListener('animationend', measure);
  new ResizeObserver(measure).observe(opening);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) reset();
  }).observe(opening);
  measure();
})();

/* La iluminación del título sólo se anima mientras la sección está a la vista. */
(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  let inView = false;
  const updateLight = () => hero.classList.toggle('hero-light-active', inView && !document.hidden);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updateLight();
  }).observe(hero);
  document.addEventListener('visibilitychange', updateLight);
})();

/* Enciende los dos haces del encabezado de flota cuando entra en pantalla. */
(() => {
  const fleetHeading = document.querySelector('.fleet-heading');
  if (!fleetHeading) return;
  let inView = false;
  const updateLights = () => fleetHeading.classList.toggle('fleet-lights-active', inView && !document.hidden);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updateLights();
  }, { threshold: .15 }).observe(fleetHeading);
  document.addEventListener('visibilitychange', updateLights);
})();
