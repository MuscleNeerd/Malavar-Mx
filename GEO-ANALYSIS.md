# Análisis SEO / GEO — Malavar Mx

Fecha: 2026-09-02 · URL analizada: `http://localhost:8765/` (copia local de `https://malavar.mx/`)
Método: Lighthouse (navegación móvil), traza de rendimiento Chrome DevTools, inspección de red y del código fuente.

---

## 1. Puntuación de preparación

| Ámbito | Puntuación | Lectura |
|---|---|---|
| **GEO Readiness** | **37 / 100** | Débil. La base técnica es buena; falta contenido citable y señales de marca. |
| SEO tradicional | 62 / 100 | Fundamentos impecables, contenido y arquitectura insuficientes. |
| Lighthouse SEO | 100 / 100 | Aprobado en los 57 chequeos aplicables. |
| Lighthouse Accesibilidad | 100 / 100 | Aprobado. |
| Lighthouse Buenas prácticas | 100 / 100 | Aprobado. |
| Lighthouse Navegación agéntica | 1 / 100 | Árbol de accesibilidad mal formado. |

### Desglose GEO por criterio

| Criterio | Peso | Puntuación | Motivo |
|---|---|---|---|
| Citabilidad | 25% | 15/100 | 457 palabras indexables. Sin bloques de respuesta autónomos, sin datos, sin definiciones. |
| Legibilidad estructural | 20% | 40/100 | Jerarquía H1→H2→H3 correcta, pero sin encabezados en forma de pregunta, sin tablas ni FAQ. |
| Contenido multimodal | 15% | 55/100 | Vídeo e imagen abundantes, pero `alt=""` y `aria-hidden` en 24 de 38 imágenes; sin `VideoObject`. |
| Autoridad y marca | 20% | 10/100 | Sin `sameAs`, sin autor, sin fechas, sin reseñas, sin presencia en Wikipedia/Reddit/YouTube/LinkedIn. |
| Accesibilidad técnica | 20% | 75/100 | HTML estático puro (ideal para rastreadores IA), `robots.txt` abierto. Falta `llms.txt` y RSL. |

**Ponderado:** (15×0.25) + (40×0.20) + (55×0.15) + (10×0.20) + (75×0.20) = **37/100**

### Desglose por plataforma

| Plataforma | Puntuación | Cuello de botella principal |
|---|---|---|
| Google AI Overviews | 30/100 | El 92% de las citas salen del top-10 orgánico. Una sola página delgada no rankea para consultas locales comerciales. |
| ChatGPT Search | 25/100 | Wikipedia aporta el 47.9% de sus citas; Malavar Mx no existe como entidad. |
| Perplexity | 20/100 | Reddit aporta el 46.7% de sus citas; huella comunitaria nula. |
| Bing Copilot | 40/100 | HTML estático indexable, pero sin IndexNow ni Bing Webmaster Tools. |

---

## 2. Acceso de rastreadores IA

`robots.txt` actual:

```
User-agent: *
Allow: /

Sitemap: https://malavar.mx/sitemap.xml
```

| Rastreador | Estado actual | Recomendación |
|---|---|---|
| GPTBot (OpenAI) | Permitido (por comodín) | Permitir explícitamente |
| OAI-SearchBot | Permitido | Permitir explícitamente |
| ChatGPT-User | Permitido | Permitir explícitamente |
| ClaudeBot (Anthropic) | Permitido | Permitir explícitamente |
| PerplexityBot | Permitido | Permitir explícitamente |
| CCBot (Common Crawl) | Permitido | Decisión del cliente — es entrenamiento, no búsqueda |
| Bytespider (ByteDance) | Permitido | Bloquear (sin retorno en visibilidad) |

**Veredicto:** funcionalmente correcto — nada está bloqueado. Conviene declararlos explícitamente para dejar constancia de la política y poder bloquear los de entrenamiento sin tocar los de búsqueda.

---

## 3. Estado de `llms.txt`

**Ausente.** No existe `/llms.txt`. Ver la plantilla propuesta en la sección 8.

**RSL 1.0:** no implementado.

---

## 4. Análisis de menciones de marca

Este es el hallazgo de mayor impacto. Las menciones de marca correlacionan **3× más** con la visibilidad en IA que los backlinks (Ahrefs, dic. 2025; correlación 0.737 para YouTube frente a 0.266 para Domain Rating).

| Señal | Estado | Prioridad |
|---|---|---|
| Google Business Profile | Sin enlazar desde el sitio | **Crítica** |
| Wikipedia / Wikidata | Sin presencia | Baja (poco realista a corto plazo) |
| YouTube | Sin canal enlazado — pese a existir 4 vídeos propios de flota | **Alta** |
| LinkedIn | Sin presencia enlazada | Media |
| Reddit | Sin huella | Media |
| Instagram / Facebook | Sin enlazar | **Alta** (sector visual) |
| `sameAs` en el schema | **Ausente** | **Crítica** |

Malavar Mx no existe como entidad resoluble para un LLM. El campo `sameAs` es el mecanismo estándar para vincular la entidad con sus perfiles y es hoy el vacío más barato de cerrar.

---

## 5. Citabilidad a nivel de pasaje

Longitud óptima para cita en IA: **134–167 palabras** por bloque autónomo.

**Total de palabras indexables del sitio: 457.** No existe ni un solo bloque que cumpla el rango. Los pasajes actuales más largos:

| Pasaje | Palabras | Problema |
|---|---|---|
| Párrafo `#nosotros` | 38 | Aspiracional, sin datos verificables |
| Descripciones de vehículo (×6) | 22–28 | Sin capacidad de equipaje, sin tarifas, sin cobertura |
| Bloques de servicio (×3) | 12–15 | Demasiado breves para citarse |

Ninguno responde una pregunta explícita. Un LLM no tiene nada que extraer y atribuir.

---

## 6. Renderizado en servidor

**Aprobado, sin reservas.** HTML estático plano; todo el contenido textual está en el marcado inicial. Los rastreadores IA no ejecutan JavaScript, y aquí no hace falta: `script.js` sólo gestiona el menú, el formulario `mailto:`, las animaciones de aparición y el carrusel Swiper.

Advertencia: los elementos `.reveal` dependen de un `IntersectionObserver` para hacerse visibles. El texto **sí está** en el HTML, así que se indexa correctamente, pero conviene no ampliar ese patrón a contenido nuevo que sea crítico.

---

## 7. Rendimiento medido

| Métrica | Medido | Objetivo | Estado |
|---|---|---|---|
| **CLS** | **1.00** | < 0.1 | **10× por encima del presupuesto** |
| Peso de `assets/` | 52 MB | — | Crítico |
| Vídeo servido en la carga inicial | 21 MB | — | Crítico |
| Peticiones en la navegación inicial | 65 | — | Alto |
| Imágenes con `loading="lazy"` | 0 de 38 | 30+ | Crítico |
| Imágenes con `width`/`height` | 0 de 38 | 38 | Crítico — causa directa del CLS |
| Imágenes en AVIF/WebP | 0 de 55 | Mayoría | Alto |

Notas de método: LCP y CLS de la traza local (136 ms / 0.00) **no son representativos** — se midieron en `localhost` sin limitación de red. El valor fiable es el CLS de 1.00 de Lighthouse móvil, que sí aplica limitación.

**Causas del CLS:** 38 imágenes sin dimensiones declaradas, más el overlay de intro que se retira a los 1.725 s (`introDeparture` en `intro-override.css`) y provoca un reflujo completo del documento.

**Peso de imágenes:** 50 de los 55 archivos son PNG. Las cuatro fotos de `van-express/van-city-*.png` pesan **2.1–2.3 MB cada una**. Todas se descargan en la navegación inicial aunque estén a varias pantallas de distancia.

**Vídeo:** los cuatro `.mp4` llevan `preload="metadata"`, pero `autoplay` invalida esa pista — el navegador descarga el archivo completo. `hero-el-viaje.mp4` (4.3 MB) y `cadillac.mp4` (6.4 MB) se confirmaron en la traza de red inicial.

---

## 8. Cinco cambios de mayor impacto

### 1. Declarar `width`/`height` y `loading="lazy"` en las 38 imágenes — CLS 1.00 → objetivo < 0.1

El fallo más grave y el más barato de arreglar. `width`/`height` reservan el espacio; `lazy` saca de la carga inicial las ~30 imágenes que están bajo el pliegue. Excluir de `lazy` sólo `nueva-portada.png` y el logo de intro.

### 2. Convertir el catálogo de imágenes a AVIF/WebP — 52 MB → objetivo < 8 MB

```bash
# Requiere: brew install libavif
for f in assets/**/*.png; do
  avifenc --min 24 --max 34 "$f" "${f%.png}.avif"
done
```

Servir con `<picture>` y respaldo PNG. Redimensionar además al tamaño real de presentación: `van-city-front.png` mide 1086×1448 px para un contenedor mucho menor.

### 3. Añadir `sameAs` y completar el schema `LocalBusiness`

Faltan `address`, `openingHours`, `sameAs`, `aggregateRating` y `geo`. Sin `sameAs` la marca no es una entidad resoluble. Añadir además `Service` × 3 y `Vehicle`/`Product` × 6, que es el marcado que alimenta las respuestas comparativas de IA.

### 4. Multiplicar el contenido indexable: 457 → 1 800+ palabras

Añadir una sección FAQ con 8–10 preguntas reales, cada respuesta como bloque autónomo de 134–167 palabras:

- ¿Cuánto cuesta rentar una camioneta de lujo con chofer en Morelos?
- ¿Qué incluye el servicio de traslado ejecutivo de Malavar Mx?
- ¿Cuántos pasajeros caben en una Cadillac Escalade?
- ¿Hacen traslados del aeropuerto de CDMX a Cuernavaca?
- ¿Con cuánta anticipación hay que reservar?
- ¿Trabajan con producciones audiovisuales?

Cada ficha de vehículo necesita además datos duros: capacidad de equipaje, motor, año, amenidades, cobertura.

### 5. Crear `llms.txt` y ampliar `robots.txt`

```
# Malavar Mx
> Renta de camionetas de lujo con chofer para traslados ejecutivos,
> eventos y rutas privadas en Morelos y la Ciudad de México.

## Páginas principales
- [Inicio](https://malavar.mx/): Flota, servicios y contacto.
- [Flota](https://malavar.mx/#flota): Seis unidades premium con chofer.
- [Servicios](https://malavar.mx/#servicios): Traslados ejecutivos, eventos y rutas privadas.

## Datos clave
- Cobertura: Morelos y Ciudad de México.
- Flota: Cadillac Escalade, GMC Yukon, Chevrolet Suburban, Toyota Hiace, Van Ejecutiva, SUVs compactas.
- Capacidad: de 5 a 12 pasajeros según unidad.
- Todos los servicios se prestan con chofer.
- Contacto: +52 55 2212 1359 · s.p.ejecutivo@gmail.com
```

---

## 9. Recomendaciones de schema

Añadir al bloque `LocalBusiness` existente:

```json
"address": {
  "@type": "PostalAddress",
  "addressRegion": "Morelos",
  "addressCountry": "MX"
},
"openingHoursSpecification": {
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
  "opens": "00:00",
  "closes": "23:59"
},
"sameAs": [
  "https://www.instagram.com/…",
  "https://www.facebook.com/…",
  "https://www.youtube.com/@…",
  "https://www.linkedin.com/company/…",
  "https://maps.google.com/?cid=…"
]
```

Tipos adicionales recomendados, por orden de retorno:

| Tipo | Para qué | Prioridad |
|---|---|---|
| `Service` ×3 | Los tres servicios de `#servicios` | Alta |
| `Vehicle` o `Product` ×6 | Las seis fichas de `#flota`, con `vehicleSeatingCapacity` | Alta |
| `FAQPage` | La sección FAQ nueva | Alta |
| `VideoObject` ×4 | Los cuatro `.mp4` de flota | Media |
| `BreadcrumbList` | Cuando existan páginas internas | Media |
| `Review` / `aggregateRating` | Sólo con reseñas reales verificables | Media |

`AutoRental` es el tipo más preciso que `LocalBusiness` para este negocio; conviene declararlo como tipo adicional.

---

## 10. Reformulación de contenido

**El `<h1>` no contiene ninguna palabra clave.** Actualmente:

```html
<h1 class="value-heading">El viaje<br /><em>empieza antes</em><br />de llegar.</h1>
```

La marca es de lujo y el titular es deliberadamente evocador. La solución no es sacrificarlo, sino acompañarlo: mantener el H1 y añadir inmediatamente después un párrafo de posicionamiento con las entidades reales.

```html
<h1 class="value-heading">El viaje<br /><em>empieza antes</em><br />de llegar.</h1>
<p class="hero-text">
  <strong>Malavar Mx</strong> es un servicio de renta de camionetas de lujo con chofer
  en Morelos y la Ciudad de México. Operamos seis unidades premium —Cadillac Escalade,
  GMC Yukon, Chevrolet Suburban, Toyota Hiace, Van Ejecutiva y SUVs compactas— para
  traslados ejecutivos, eventos y rutas privadas de 5 a 12 pasajeros.
</p>
```

Esto entrega el patrón «X es…» que los LLM extraen como definición, sin tocar la dirección creativa.

**Pasajes concretos a reescribir:**

| Ubicación | Ahora | Cambio |
|---|---|---|
| `#nosotros` | 38 palabras aspiracionales | Bloque de 150 palabras: años de operación, número de traslados, cobertura, protocolo de chofer |
| Fichas de vehículo ×6 | 22–28 palabras | 140 palabras cada una con especificaciones y casos de uso |
| `#servicios` ×3 | 12–15 palabras | 140 palabras cada uno: qué incluye, cómo se cotiza, tiempos |
| `#clientes` | Sólo logotipos | Añadir un párrafo nombrando el sector: 12 productoras audiovisuales |

**Añadir un `<footer>`.** No existe. Debe llevar el NAP completo (nombre, dirección, teléfono) en texto plano, coherente con el schema y con Google Business Profile.

---

---

## Estado de ejecución (rama `seo/optimizacion-geo`)

Fases 1 a 4 implementadas y verificadas. Resultados medidos tras los cambios:

| Métrica | Antes | Después |
|---|---|---|
| CLS (Lighthouse móvil) | 1.00 | **0.00** |
| Peso de la carga inicial | 43.45 MB | **3.37 MB** |
| Peticiones iniciales | 65 | **30** |
| Vídeo en la carga inicial | 21 MB (4 archivos) | **2.0 MB** (sólo el hero) |
| Palabras indexables | 457 | **2 562** |
| Imágenes con dimensiones | 0 / 38 | **38 / 38** |
| Nodos de schema | 4 | **13** |
| Lighthouse SEO / A11y / BP | 100 / 100 / 100 | **100 / 100 / 100** |
| Lighthouse navegación agéntica | 1 | **67** |

**La causa real del CLS no eran las imágenes.** `script.js` añadía la clase
`.scene` a todas las secciones después de cargar, y `styles.css` le da
`min-height: 100svh`: cada sección crecía un viewport entero tras el primer
pintado. Medido con `PerformanceObserver`, el desplazamiento salía de
`section#inicio.hero` a los 71 ms con un valor de 1.0. La clase se movió al
marcado. Declarar `width`/`height` en las 38 imágenes seguía siendo necesario,
pero por sí solo no habría corregido nada.

### Pendiente, requiere decisión o cuentas externas

- **`sameAs`**: sin perfiles que enlazar. El hueco está marcado con un
  comentario en el `<head>` de `index.html`. Es la señal de entidad de mayor
  retorno del informe.
- **Google Business Profile**: sin dar de alta. El NAP del footer y del schema
  debe coincidir exactamente con el que se registre.
- **Fase 5 (páginas de destino)**: fuera del alcance de esta rama por decisión
  explícita. Sigue siendo el techo estructural del proyecto.
- **Revisión de copy**: el contenido nuevo describe la operación en términos
  verificables (capacidades, cobertura, modalidades de contratación), pero
  conviene que el cliente confirme los detalles de servicio antes de publicar.
- **8.6 MB de assets huérfanos** de iteraciones anteriores siguen en `assets/`
  (`malavar-opening*.png`, `fleet-*.jpg`, `malavar-mx-logo.png`). No se sirven
  al visitante, así que no afectan al rendimiento, pero pueden podarse.
- **Los PNG originales se conservan** junto a los WebP como másteres. Sólo se
  sirven los WebP.

---

## Arquitectura: el techo estructural

Malavar Mx es **una sola URL**. Aunque se corrija todo lo anterior, una página no puede rankear simultáneamente para consultas de intención distinta.

Páginas recomendadas, por retorno esperado:

| URL | Consulta objetivo |
|---|---|
| `/renta-camionetas-cuernavaca/` | «renta de camionetas con chofer Cuernavaca» |
| `/traslados-aeropuerto-cdmx/` | «traslado aeropuerto CDMX a Cuernavaca» |
| `/transporte-producciones-audiovisuales/` | «transporte para producciones México» — respaldado por los 12 clientes reales |
| `/flota/cadillac-escalade/` | «rentar Cadillac Escalade México» |
| `/transporte-bodas-eventos/` | «transporte para bodas Morelos» |

La página de producciones audiovisuales es la de mayor retorno: es el único terreno donde Malavar Mx ya tiene prueba social verificable y competencia baja.

---

## Plan por fases

### Fase 1 — Correcciones técnicas (semana 1)
1. `width`/`height` en las 38 imágenes → corrige el CLS de 1.00
2. `loading="lazy"` en las ~30 imágenes bajo el pliegue
3. Quitar `autoplay` de los vídeos bajo el pliegue; cargar bajo demanda con `IntersectionObserver`
4. `<link rel="preload">` para el póster del hero
5. `llms.txt` y `robots.txt` ampliado

### Fase 2 — Datos estructurados y entidad (semana 2)
6. `sameAs`, `address`, `openingHoursSpecification`, `geo` en `LocalBusiness`
7. Declarar `AutoRental` como tipo adicional
8. `Service` ×3 y `Vehicle` ×6
9. Crear y enlazar Google Business Profile
10. `<footer>` con NAP en texto plano

### Fase 3 — Contenido (semanas 3-4)
11. Párrafo de posicionamiento bajo el H1
12. FAQ con 8–10 bloques de 134–167 palabras + `FAQPage`
13. Reescritura de las 6 fichas de vehículo y los 3 servicios
14. Alt text descriptivo en las galerías (revisar el `aria-hidden` decorativo)

### Fase 4 — Optimización de medios (semanas 4-5)
15. Conversión a AVIF/WebP con respaldo `<picture>`
16. Redimensionado al tamaño real de presentación
17. Recompresión de los cuatro `.mp4`
18. Objetivo: 52 MB → menos de 8 MB

### Fase 5 — Arquitectura y señales de marca (semanas 6-10)
19. Las cinco páginas de destino
20. Actualizar `sitemap.xml` (hoy tiene una sola URL)
21. Canal de YouTube con los vídeos de flota existentes
22. Perfiles de Instagram, Facebook y LinkedIn enlazados vía `sameAs`
23. Alta en Bing Webmaster Tools + IndexNow
24. Solicitud de reseñas en Google a los clientes de producción existentes

---

## Ganancias rápidas (menos de una hora cada una)

- [ ] `width`/`height` en todas las imágenes — corrige el fallo de CLS
- [ ] `loading="lazy"` bajo el pliegue
- [ ] `sameAs` en el schema
- [ ] `llms.txt`
- [ ] `<footer>` con NAP
- [ ] Párrafo de posicionamiento «Malavar Mx es…» bajo el H1
- [ ] `robots.txt` con rastreadores IA explícitos

---

## Lo que ya está bien hecho

Conviene no tocarlo:

- Lighthouse SEO, Accesibilidad y Buenas prácticas: 100/100 los tres
- `canonical` y `hreflang` correctos
- Open Graph y Twitter Card completos, con imagen 1200×630 y `og:image:alt`
- HTML semántico y jerarquía de encabezados válida
- `robots.txt` y `sitemap.xml` presentes y bien formados
- HTML estático — el escenario ideal para rastreadores IA
- El `aria-label` de los vídeos y el `aria-hidden` de las galerías decorativas son decisiones correctas
- `rel="noopener noreferrer"` en todos los enlaces externos
