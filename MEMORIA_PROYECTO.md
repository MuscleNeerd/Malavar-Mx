# Memoria del proyecto — Malavar Mx

Última actualización: **2026-10-05**.
Este archivo es el punto de continuación entre sesiones. Se actualiza con cada
commit solicitado por el usuario; las versiones anteriores quedan en Git.
Revisar siempre el árbol actual antes de asumir que sigue igual.

## Punto de guardado

- Rama: `main`.
- Remoto: `origin` → `git@github.com:MuscleNeerd/Malavar-Mx.git`.
- Repositorio: https://github.com/MuscleNeerd/Malavar-Mx.
- Commit base: `e16f9b7` — «Guarda el contexto del proyecto y el prompt de continuación».
- Mensaje del commit que contiene este registro:
  **«Mejora la portada con iluminación interactiva y tipografía refinada»**.
- Alcance autorizado: crear el commit local solicitado; no se solicitó push ni despliegue.
- Para obtener el hash del registro: `git log -1 --format='%h %s' -- MEMORIA_PROYECTO.md`.

## Estado funcional y técnico

Sitio estático de una página para renta de camionetas de lujo con chofer en
Morelos y México. HTML, CSS y JavaScript sin framework, backend, instalación de
paquetes ni compilación. Contenido en español (`es-MX`). Diseño oscuro de estilo
cinematográfico, acentos dorados, videos y galerías de imágenes.

- `index.html`: portada de flota, inicio, nosotros, flota, servicios, clientes y
  contacto. Flota de seis fichas: Cadillac Escalade, GMC Yukon, Chevrolet
  Suburban, Toyota Hiace, SUVs y Van Ejecutiva.
- `script.js`: menú móvil con cierre mediante fondo, enlaces y Escape;
  formulario que abre el correo mediante `mailto:`; animaciones de aparición y
  carrusel de clientes. Limpieza de logos por canvas inactiva al no existir
  elementos `data-clean-logo`.
- Carrusel: Swiper 11.2.6 por CDN, 12 logos, dos filas, dos columnas en móvil y
  tres desde 761 px. Mantener `grid.fill: 'column'` y menos de 12 logos visibles
  a la vez; sincronizar filas y espacio con `clients-swiper.css`.
- CSS local en orden: `styles.css`, `experience.css`, `intro-override.css`,
  `clients-gallery.css`, `reference-style.css`, `clients-swiper.css`. La cascada
  es deliberada; consultar `CLAUDE.md` antes de modificar estilos.
- Versiones actuales en HTML: `reference-style.css?v=20261005-7`,
  `clients-swiper.css?v=20260903-6` y `script.js?v=20261005-3`. Incrementar `?v=`
  al editar CSS o JavaScript con parámetros de caché en HTML.
- Las galerías de nosotros, Hiace, SUVs y Van usan crossfade CSS: al cambiar el
  número de fotos, ajustar retrasos, duración y porcentajes de keyframes juntos.
- Google Fonts y Font Awesome 7.3.1 también se cargan desde CDN.
- SEO presente: canonical y hreflang para `https://malavar.mx/`, Open Graph,
  Twitter Card, JSON-LD LocalBusiness, `robots.txt`, `sitemap.xml`, favicons y
  `site.webmanifest`. La imagen social utilizada es `assets/og-image.jpg`.
- Contactos: `+52 55 2212 1359`, `s.p.ejecutivo@gmail.com` y WhatsApp
  `https://wa.me/525522121359`. Si cambian, actualizar todas las apariciones en
  HTML, JSON-LD y el destinatario de respaldo en JavaScript.

## Cambios incluidos en este punto

- `index.html`: añade el lienzo de luces sobre la portada de las tres camionetas
  y capas visuales para el haz del título. El título sigue siendo texto accesible,
  separado en líneas para aplicar reflejos metálicos animados. El párrafo de
  apertura adopta el mismo tratamiento tipográfico que «En Malavar Mx creemos…».
- `reference-style.css`: quita el grano del sitio y aclara la fotografía de las
  tres camionetas con más brillo, contraste y saturación. Añade faros que siguen
  el cursor, adaptados al recorte de `object-fit: cover` y desactivados en
  pantallas táctiles o cuando se reduce el movimiento. Añade iluminación azul
  animada desde arriba a la izquierda, reflejos sincronizados en el título y
  sombras hacia abajo a la derecha. Los efectos del hero se pausan cuando no está
  visible o la pestaña deja de estar activa. Los párrafos de inicio y Nosotros
  comparten DM Sans, 15 px, peso 400, interlineado 1.8 y el mismo color.
- `script.js`: controla la posición del cursor y los faros de la portada, y pausa
  los efectos del hero cuando no está visible o la pestaña está inactiva.
- Se conserva el título de pestaña «MalavarMx»; los metadatos sociales mantienen
  su título descriptivo.

## Verificación y límites

- Se revisó el efecto visual en Chrome de escritorio y a 400 px de ancho CSS;
  el encabezado se mantiene dentro del viewport y hay separación entre el botón
  de cotización y «Explorar flota» en móvil.
- La consola del navegador no presentó errores al revisar los cambios visuales.
- `git diff --check`: sin errores antes del commit.
- No hay suite automatizada en el proyecto. No se verificaron el dominio
  publicado ni los CDN.
- La presencia de URLs de producción en los metadatos no confirma un despliegue.

## Archivos fuera del commit y pendientes

Al preparar este registro quedaron dos archivos locales sin seguimiento, no
referenciados por el sitio, que se conservaron sin añadir ni borrar:

- `og_image.jpg` en la raíz; no confundir con `assets/og-image.jpg`, ya versionado.
- `Captura de pantalla 2026-08-31 a la(s) 1.05.47 p.m..png` en la raíz.

`output/` y `tmp/` están en `.gitignore` a propósito: entregables de ImageGen y
scratch. Un asset se incorpora al repositorio cuando se copia a `assets/`.

Las modificaciones de portada indicadas hasta este punto están incluidas en este
checkpoint. La siguiente tarea funcional depende de la indicación del usuario.
No hacer push sin autorización explícita.

## Cómo ejecutar en local

Desde la raíz del proyecto:

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000`. Preferir HTTP sobre `file://` por las restricciones
de canvas y reproducción de medios del navegador.

## Prompt de continuación

```text
Continúa el proyecto Malavar Mx en /Users/mauriciolair/PROYECTOS/Malavar Web.
Lee AGENTS.md, MEMORIA_PROYECTO.md y CLAUDE.md antes de hacer cambios. Revisa
git status, git diff y los commits recientes para contrastar esta memoria.

Es un sitio estático en español de renta de camionetas de lujo, con diseño
oscuro, seis fichas de vehículos, galerías CSS y carrusel Swiper de clientes.
No requiere compilación; se sirve con python3 -m http.server 8000.
Respeta el orden de CSS, las reglas de crossfade y el carrusel de dos filas.
Incrementa el ?v= de index.html si editas reference-style.css o clients-swiper.css.

El último commit añadió una portada más clara sin grano, faros interactivos que
siguen el cursor y una luz azul animada sobre el título «El viaje empieza antes
de llegar». El párrafo de inicio comparte ahora la tipografía del párrafo de
Nosotros. Se revisó la vista de escritorio y la adaptación a móvil; no se verificó
el despliegue. Dos imágenes sueltas de la raíz quedaron fuera y se identifican en
esta memoria: no añadirlas automáticamente. `output/` y `tmp/` son entregables y
scratch ignorados por Git.

Cada vez que te pida un commit, actualiza el estado y este prompt en
MEMORIA_PROYECTO.md e inclúyelos en el mismo commit. Mi petición explícita de
commit ya lo autoriza; para push necesitas autorización explícita propia.
Al terminar una modificación, sugiere el commit con un mensaje en español si
todavía no está autorizado. No hay una siguiente tarea funcional definida:
espera mi indicación y no inventes cambios pendientes.
```
