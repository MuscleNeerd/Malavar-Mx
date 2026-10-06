# AGENTS.md

Instrucciones para agentes de código (Codex) en el proyecto **Malavar Mx**.

Al iniciar una sesión, lee [`MEMORIA_PROYECTO.md`](./MEMORIA_PROYECTO.md) para
recuperar el estado guardado y el prompt de continuación. Contrástalo con
`git status` y los archivos actuales: puede haber cambios posteriores al registro.

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

## Regla: guardar memoria y continuación en cada commit

Cada vez que el usuario pida un commit:

1. Revisa el estado real del proyecto y los cambios que se van a incluir.
2. Actualiza `MEMORIA_PROYECTO.md` antes de crear el commit. Registra fecha,
   rama, estado funcional y técnico, decisiones relevantes, cambios incluidos,
   verificaciones realizadas, pendientes y archivos excluidos. No guardes secretos.
3. Renueva en ese mismo archivo un prompt de continuación listo para copiar en
   una sesión limpia, con el contexto necesario y el siguiente paso conocido.
   Si no hay una nueva tarea definida, indícalo sin inventar trabajo pendiente.
4. Incluye la memoria en el mismo commit que los cambios. Para identificarlo
   desde el documento usa su mensaje y el commit base; no intentes insertar el
   hash del propio commit antes de crearlo.
5. Informa el hash y resultado después de comprobar el commit. Distingue commit
   local de push y no afirmes publicación o validaciones que no se realizaron.

Esta memoria vive en el repositorio y permite continuar entre sesiones; no
depende de recordar el chat. Una petición explícita de crear un commit ya
autoriza ese commit y no requiere una segunda confirmación. El push requiere
autorización explícita propia.
