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
const fleetOpening = document.querySelector('.fleet-opening');
const hero = document.querySelector('.hero');
const statement = document.querySelector('.statement');
const fleetHeading = document.querySelector('.fleet-heading');
const vehicles = [...document.querySelectorAll('.vehicle')];
const services = document.querySelector('.services');
const clients = document.querySelector('.clients');
const contact = document.querySelector('.contact');
const sceneList = [fleetOpening, hero, statement, fleetHeading, ...vehicles, services, clients, contact];
const stage = document.createElement('div');
stage.id = 'experience-stage';
stage.setAttribute('aria-live', 'polite');

sceneList.forEach((scene, index) => {
  scene.classList.add('scene');
  scene.dataset.scene = index;
  stage.append(scene);
});
main.after(stage);
main.remove();
document.querySelector('.fleet')?.remove();
document.querySelector('footer')?.remove();

const dots = document.createElement('div');
dots.className = 'scene-dots';
dots.setAttribute('aria-label', 'Navegación de la experiencia');
sceneList.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Ir a escena ${index + 1}`);
  dot.addEventListener('click', () => showScene(index));
  dots.append(dot);
});
document.body.append(dots);

let currentScene = 0;
let locked = false;
function showScene(index) {
  const next = Math.max(0, Math.min(index, sceneList.length - 1));
  if (next === currentScene && sceneList[currentScene].classList.contains('is-active')) return;
  currentScene = next;
  document.body.classList.toggle('fleet-screen', currentScene === 0);
  document.body.classList.toggle('light-scene', [2, 3, 5, 7, 8].includes(currentScene));
  sceneList.forEach((scene, sceneIndex) => {
    scene.classList.toggle('is-active', sceneIndex === currentScene);
    scene.classList.toggle('is-before', sceneIndex < currentScene);
    scene.classList.toggle('visible', sceneIndex === currentScene);
    scene.querySelectorAll('.reveal').forEach((element) => element.classList.toggle('visible', sceneIndex === currentScene));
  });
  [...dots.children].forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === currentScene));
}
showScene(0);
window.setTimeout(() => {
  if (currentScene === 0) moveScene(1);
}, 7800);

function moveScene(direction) {
  if (locked || !direction) return;
  const next = currentScene + direction;
  if (next < 0 || next >= sceneList.length) return;
  locked = true;
  showScene(next);
  window.setTimeout(() => { locked = false; }, 760);
}

window.addEventListener('wheel', (event) => {
  event.preventDefault();
  if (Math.abs(event.deltaY) > 16) moveScene(Math.sign(event.deltaY));
}, { passive: false });

let touchStartY = 0;
window.addEventListener('touchstart', (event) => {
  touchStartY = event.changedTouches[0].clientY;
}, { passive: true });
window.addEventListener('touchend', (event) => {
  const verticalDifference = touchStartY - event.changedTouches[0].clientY;
  if (Math.abs(verticalDifference) > 45) moveScene(Math.sign(verticalDifference));
}, { passive: true });
window.addEventListener('keydown', (event) => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
  if (['ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); moveScene(1); }
  if (['ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); moveScene(-1); }
});

const destinations = { inicio: 1, nosotros: 2, flota: 3, servicios: 7, clientes: 8, contacto: 9 };
document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
  const destination = link.getAttribute('href').slice(1);
  if (destinations[destination] !== undefined) { event.preventDefault(); showScene(destinations[destination]); }
}));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
toggle?.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-note').textContent = 'Gracias. Recibimos tu solicitud y te contactaremos pronto.';
  event.currentTarget.reset();
});
