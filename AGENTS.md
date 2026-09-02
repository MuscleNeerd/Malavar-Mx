# AGENTS.md

Instrucciones para agentes de código (Codex) en el proyecto **Malavar Mx**.

El contexto técnico del proyecto — orden de carga del CSS, galerías de crossfade,
archivos muertos, estructura de `assets/` y `output/` — está documentado en
[`CLAUDE.md`](./CLAUDE.md). Léelo antes de tocar estilos.

## Regla: proponer actualizar el repositorio al terminar

Siempre que el usuario dé por terminada una modificación —una sección nueva, un
ajuste de estilos, un cambio de copy, assets añadidos o reemplazados—, **sugiere
actualizar el repositorio con esos cambios** antes de cerrar la conversación.

La sugerencia debe:

1. Ejecutarse solo cuando el trabajo esté terminado, no a media tarea ni tras
   cada edición suelta de un mismo cambio.
2. Resumir en una línea qué archivos cambiaron y proponer un mensaje de commit
   concreto (en español, imperativo: «Añade ficha de la Hiace»).
3. Recordar que `output/` y `tmp/` están en `.gitignore` a propósito: son
   entregables de ImageGen y scratch, no assets del sitio. Un asset solo entra
   al repo cuando se copia a `assets/`.
4. Avisar si se editó `reference-style.css` sin haber subido el parámetro
   cache-buster `?v=` en `index.html`, porque el navegador serviría la copia vieja.

**Esperar la confirmación explícita del usuario antes de hacer commit o push.**
Proponer no es ejecutar.

El remoto es `origin` → https://github.com/MuscleNeerd/Malavar-Mx (rama `main`).
