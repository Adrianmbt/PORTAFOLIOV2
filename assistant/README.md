# Asistente del portafolio (n8n + Qdrant + OpenAI)

Asistente con RAG parcial sobre la trayectoria de Adrián. La UI funciona sola con recuperación local en el navegador y mejora cuando se conecta al webhook de n8n.

## Arquitectura

```
React (Vite)
  └─ POST /webhook/portfolio-chat  (si VITE_ASSISTANT_WEBHOOK_URL existe)
       └─ n8n: Webhook → Normalize → Embeddings → Qdrant search
                → Build prompt → Chat → Respond
  └─ fallback local: src/data/knowledge.json + src/lib/assistant.js
```

- `src/data/knowledge.json` es la única fuente de conocimiento. La usan el fallback del navegador y la ingesta.
- La API key vive solo en n8n (`$env`), nunca en el bundle de Vite.
- Si n8n falla o tarda más de 15 s, el cliente responde con el RAG local.

## Requisitos

- Docker Desktop (o Docker Engine + Compose v2)
- Una API key de OpenAI (o proxy compatible)

## Pasos

1. Crear el archivo de entorno:

   ```bash
   cp assistant/.env.example assistant/.env
   ```

   Editar `assistant/.env` y completar `OPENAI_API_KEY`.

2. Levantar Qdrant y n8n:

   ```bash
   docker compose -f assistant/docker-compose.yml up -d qdrant n8n
   ```

   - n8n: http://localhost:5678
   - Qdrant: http://localhost:6333/dashboard

3. Importar el workflow:

   - En n8n: **Workflows → Import from File** → `assistant/workflows/portfolio-assistant.json`.
   - Revisar que las expresiones `$env.*` resuelvan y **activar** el workflow.
   - La URL del webhook de producción queda en `http://localhost:5678/webhook/portfolio-chat`.

4. Indexar el conocimiento (crea/recrea la colección y sube los vectores):

   ```bash
   docker compose -f assistant/docker-compose.yml --profile ingest run --rm ingest
   ```

   Repetir este paso cada vez que cambie `src/data/knowledge.json`.

5. Conectar el frontend:

   ```bash
   cp .env.example .env
   ```

   Con `VITE_ASSISTANT_WEBHOOK_URL=http://localhost:5678/webhook/portfolio-chat`, reiniciar `npm run dev`.

6. Probar el webhook:

   ```bash
   curl -X POST http://localhost:5678/webhook/portfolio-chat \
     -H "Content-Type: application/json" \
     -d '{"message":"¿Qué sistemas ha construido?","sessionId":"test"}'
   ```

## Notas

- **CORS**: el nodo Webhook usa `allowedOrigins: "*"` y la respuesta agrega `Access-Control-Allow-Origin`. Para producción, restringir al dominio real.
- **Modelos**: `text-embedding-3-small` produce vectores de 1536 dimensiones (tamaño fijado en la ingesta). Si cambiás de modelo de embeddings, actualizá `VECTOR_SIZE` en `assistant/ingest/ingest.js` y recreá la colección.
- **Seguridad**: no exponer n8n a internet sin autenticación. Rotar la API key si se filtró. El webhook público puede limitarse por origen y rate limit en un reverse proxy.
- **Datos**: el ingestor monta el repo en `/workspace` en modo lectura; no modifica archivos.
- **Sin Docker**: la UI sigue siendo funcional con el fallback local (sin llamadas externas).

## Solución de problemas

- `Embedding inválido` o 401 en n8n: revisar `OPENAI_API_KEY` y `OPENAI_BASE_URL`.
- Qdrant vacío: volver a correr el perfil `ingest` y confirmar el log `Listo: N fragmentos`.
- El panel muestra `RAG local`: falta `VITE_ASSISTANT_WEBHOOK_URL` o el dev server no se reinició después de crear `.env`.
- El navegador bloquea la petición: confirmar que n8n está en `localhost` y que el workflow está activo (no en modo test).
