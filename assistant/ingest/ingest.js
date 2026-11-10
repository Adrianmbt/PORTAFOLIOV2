const fs = require('node:fs/promises');

const OPENAI_BASE_URL = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small';
const QDRANT_URL = (process.env.QDRANT_URL || 'http://qdrant:6333').replace(/\/+$/, '');
const QDRANT_COLLECTION = process.env.QDRANT_COLLECTION || 'portfolio';
const KNOWLEDGE_PATH = process.env.KNOWLEDGE_PATH || '/workspace/src/data/knowledge.json';
const VECTOR_SIZE = 1536;
const BATCH_SIZE = 16;

function required(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`[ingest] Falta la variable ${name}`);
    process.exit(1);
  }
  return value;
}

async function waitForQdrant(attempts = 30) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(`${QDRANT_URL}/collections`);
      if (response.ok) return;
    } catch (error) {
      // Qdrant todavía no acepta conexiones.
    }

    console.log(`[ingest] Esperando Qdrant (${attempt}/${attempts})…`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  throw new Error('Qdrant no respondió a tiempo');
}

async function createCollection() {
  await fetch(`${QDRANT_URL}/collections/${QDRANT_COLLECTION}`, { method: 'DELETE' });

  const response = await fetch(`${QDRANT_URL}/collections/${QDRANT_COLLECTION}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      vectors: { size: VECTOR_SIZE, distance: 'Cosine' },
    }),
  });

  if (!response.ok) {
    throw new Error(`No se pudo crear la colección: ${await response.text()}`);
  }
}

async function embed(texts) {
  const response = await fetch(`${OPENAI_BASE_URL}/embeddings`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: texts }),
  });

  if (!response.ok) {
    throw new Error(`Embeddings fallaron: ${await response.text()}`);
  }

  const data = await response.json();
  return data.data.map((item) => item.embedding);
}

async function upsert(points) {
  const response = await fetch(
    `${QDRANT_URL}/collections/${QDRANT_COLLECTION}/points?wait=true`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points }),
    }
  );

  if (!response.ok) {
    throw new Error(`Upsert falló: ${await response.text()}`);
  }
}

async function main() {
  required('OPENAI_API_KEY');

  const raw = await fs.readFile(KNOWLEDGE_PATH, 'utf8');
  const knowledge = JSON.parse(raw);
  const chunks = Array.isArray(knowledge.chunks) ? knowledge.chunks : [];

  if (!chunks.length) {
    throw new Error(`No hay chunks en ${KNOWLEDGE_PATH}`);
  }

  await waitForQdrant();
  await createCollection();

  let indexed = 0;

  for (let start = 0; start < chunks.length; start += BATCH_SIZE) {
    const batch = chunks.slice(start, start + BATCH_SIZE);
    const vectors = await embed(batch.map((chunk) => `${chunk.title}. ${chunk.text}`));

    const points = batch.map((chunk, index) => ({
      id: chunk.id,
      vector: vectors[index],
      payload: {
        title: chunk.title,
        topic: chunk.topic,
        text: chunk.text,
        keywords: chunk.keywords || [],
      },
    }));

    await upsert(points);
    indexed += batch.length;
    console.log(`[ingest] Indexados ${indexed}/${chunks.length}`);
  }

  console.log(`[ingest] Listo: ${indexed} fragmentos en "${QDRANT_COLLECTION}"`);
}

main().catch((error) => {
  console.error(`[ingest] ${error.message}`);
  process.exit(1);
});
