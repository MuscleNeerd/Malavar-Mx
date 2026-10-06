# Memoria del proyecto — Malavar Mx

Última actualización: **2026-10-05**.
Este archivo es el punto de continuación entre sesiones. Se actualiza con cada
commit solicitado por el usuario; las versiones anteriores quedan en Git.
Revisar siempre el árbol actual antes de asumir que sigue igual.

## Punto de guardado

- Rama: `main`.
- Remoto: `origin` → `git@github.com:MuscleNeerd/Malavar-Mx.git`.
- Repositorio: https://github.com/MuscleNeerd/Malavar-Mx.
- Commit base: `193095e` — «Añade metadatos SEO y favicon de Malavar Mx».
- Mensaje del commit que contiene este registro:
  **«Guarda el contexto del proyecto y el prompt de continuación»**.
- Alcance autorizado: crear un commit local; no se solicitó push ni despliegue.
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
- Versiones actuales en HTML: `reference-style.css?v=20260903-6` y
  `clients-swiper.css?v=20260903-6`. Incrementar `?v=` al editar esos archivos.
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

- `AGENTS.md`: lectura de esta memoria al iniciar y regla para actualizar estado
  y prompt de continuación antes de cada commit solicitado.
- `MEMORIA_PROYECTO.md`: estado actual, decisiones, verificaciones y prompt.
- `CLAUDE.md`: referencia al flujo de memoria y correcciones sobre Git,
  dependencias CDN, idioma, versión CSS y comportamiento del menú móvil.
- `index.html`: se conserva e incluye el cambio ya presente al iniciar esta
  sesión: título de pestaña de «Renta de Camionetas de Lujo en México | Malavar
  Mx» a «MalavarMx». Los títulos Open Graph/Twitter mantienen su texto existente.
- No se modificaron estilos; no corresponde incrementar su cache-buster.

## Verificación y límites

- Referencias locales de `src`, `href` y `poster` en HTML: 53 rutas únicas,
  todas existentes; anclas internas con destino existente.
- `site.webmanifest`: JSON válido e iconos existentes.
- `sitemap.xml`: XML válido.
- `node --check script.js`: correcto.
- `git diff --check`: sin errores antes del commit.
- No hay suite automatizada en el proyecto. Este punto no incluye una revisión
  visual en navegador ni una comprobación del dominio publicado o de los CDN.
- La presencia de URLs de producción en los metadatos no confirma un despliegue.

## Archivos fuera del commit y pendientes

Al preparar este registro quedaron dos archivos locales sin seguimiento, no
referenciados por el sitio, que se conservaron sin añadir ni borrar:

- `og_image.jpg` en la raíz; no confundir con `assets/og-image.jpg`, ya versionado.
- `Captura de pantalla 2026-08-31 a la(s) 1.05.47 p.m..png` en la raíz.

`output/` y `tmp/` están en `.gitignore` a propósito: entregables de ImageGen y
scratch. Un asset se incorpora al repositorio cuando se copia a `assets/`.

No hay una nueva modificación funcional definida. La siguiente tarea depende de
la indicación del usuario. No hacer push sin autorización explícita.

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

El último punto de guardado añadió memoria persistente y el procedimiento de
continuación; también incluyó el título de pestaña MalavarMx que ya estaba
editado. Se verificaron rutas y anclas locales, manifest, sitemap y sintaxis JS.
No se hizo revisión visual ni se verificó el despliegue. Dos imágenes de la raíz
quedaron sin seguimiento, identificadas en la memoria: consérvalas sin añadirlas
automáticamente. output/ y tmp/ son entregables y scratch ignorados por Git.

Cada vez que te pida un commit, actualiza el estado y este prompt en
MEMORIA_PROYECTO.md e inclúyelos en el mismo commit. Mi petición explícita de
commit ya lo autoriza; para push necesitas autorización explícita propia.
Al terminar una modificación, sugiere el commit con un mensaje en español si
todavía no está autorizado. No hay una siguiente tarea funcional definida:
espera mi indicación y no inventes cambios pendientes.
```
