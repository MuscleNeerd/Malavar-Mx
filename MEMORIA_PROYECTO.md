# Memoria del proyecto — Malavar Mx

Última actualización: **2026-10-06**. Este archivo y el prompt de continuación
se actualizan con cada commit solicitado. Contrasta siempre esta memoria con el
árbol actual, porque puede haber trabajo posterior.

## Punto de guardado

- Rama: `main`.
- Remoto: `origin` → `https://github.com/MuscleNeerd/Malavar-Mx`.
- Commit base antes de este registro: `3399043` — «Mejora la portada con
  iluminación interactiva y tipografía refinada».
- Commit que debe contener este registro: **«Traslada las luces al encabezado
  de flota»**.
- Es un commit local. No se solicitó push ni despliegue.

## Estado técnico

Sitio estático de una página en español (`es-MX`) para renta de camionetas de
lujo con chofer en Morelos y México. Usa HTML, CSS y JavaScript sin framework,
backend, paquetes ni paso de compilación. Se sirve localmente con
`python3 -m http.server 8000`.

- `index.html` contiene portada, Nosotros, seis fichas de flota, servicios,
  clientes y contacto. El formulario abre el correo mediante `mailto:`.
- Orden de CSS: `styles.css`, `experience.css`, `intro-override.css`,
  `clients-gallery.css`, `reference-style.css`, `clients-swiper.css`. Leer
  `CLAUDE.md` antes de modificar estilos; el orden de cascada es deliberado.
- Versiones del HTML en este checkpoint: `reference-style.css?v=20261006-18`,
  `script.js?v=20261006-6`, `clients-swiper.css?v=20260903-6`. Actualizar el
  `?v=` correspondiente al editar hojas o JavaScript con cache-buster.
- El carrusel usa Swiper 11.2.6 por CDN y 12 logos. Mantener dos filas, su orden
  de relleno por columna y sincronizar el CSS en `clients-swiper.css`.
- Galerías de Nosotros, Hiace, SUVs y Van usan crossfade CSS; al cambiar el
  número de imágenes, ajustar juntos intervalos y keyframes.
- Fuentes, Font Awesome y Swiper se cargan desde CDN. El sitio incluye metadatos
  SEO, JSON-LD LocalBusiness y recursos para redes sociales.
- Los teléfonos, correo y WhatsApp aparecen en HTML, JSON-LD y JavaScript;
  mantenerlos sincronizados si cambian.

## Cambios incluidos en este punto

- `index.html`: coloca dos focos azules diagonales en las esquinas superiores
  del encabezado «Diseñada para hacer presencia». Quita esas luces del panel
  «Elegancia que se mueve contigo». Actualiza los cache-busters.
- `reference-style.css`: aplica a los focos su respiración y movimiento suave,
  intensidad al 75% y sombras al encabezado de flota. Retira las sombras de luz
  de «Elegancia que se mueve contigo» y restaura allí la tipografía Josefin Sans
  ligera que usa «El viaje empieza antes de llegar», sin cambiar su color.
- `script.js`: activa los focos mientras el encabezado de flota está visible y
  los pausa cuando se oculta la pestaña.
- No se modificaron assets del sitio. Dos archivos sueltos de la raíz quedan
  fuera del commit: `og_image.jpg` y
  `Captura de pantalla 2026-08-31 a la(s) 1.05.47 p.m..png`.
- `output/` y `tmp/` están ignorados a propósito: entregables de ImageGen y
  scratch. Un asset solo se incorpora al repositorio al copiarlo a `assets/`.

## Verificación y límites

- `git diff --check`: pasó.
- `node --check script.js`: pasó.
- No se ejecutó suite automatizada; el proyecto no tiene una suite configurada.
- No se verificó el sitio publicado ni los recursos CDN.

## Prompt de continuación

```text
Continúa el proyecto Malavar Mx en /Users/mauriciolair/PROYECTOS/Malavar Web.
Lee AGENTS.md, MEMORIA_PROYECTO.md y CLAUDE.md. Contrasta esta memoria con
git status, git diff y los commits recientes antes de actuar.

Es un sitio estático en español para una empresa de traslados de lujo. No tiene
build; se puede servir con python3 -m http.server 8000. Respeta el orden de CSS,
las galerías crossfade y el carrusel Swiper de dos filas.

El último commit «Traslada las luces al encabezado de flota» coloca dos haces
azules diagonales en las esquinas superiores de «Diseñada para hacer presencia».
Respiran y se activan al aparecer el encabezado en pantalla. El panel «Elegancia
que se mueve contigo» ya no tiene luces y usa la tipografía Josefin Sans ligera
del título «El viaje empieza antes de llegar»; su color se conserva. Los
cache-busters actuales son reference-style.css?v=20261006-18 y
script.js?v=20261006-6. Las verificaciones realizadas fueron git diff --check y
node --check script.js; no se probó despliegue.

Deja fuera `og_image.jpg` y `Captura de pantalla 2026-08-31 a la(s) 1.05.47 p.m..png`
de la raíz, salvo que el usuario pida expresamente incorporarlos. `output/` y
`tmp/` son entregables/scratch ignorados; los assets versionados van en `assets/`.

Al recibir una solicitud de commit, actualiza esta memoria y el prompt en el
mismo commit. La solicitud explícita del usuario autoriza commit local; push
requiere autorización explícita. Si no hay siguiente tarea definida, espera la
indicación del usuario sin inventar trabajo pendiente.
```
