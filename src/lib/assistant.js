import knowledge from '../data/knowledge.json';

const WEBHOOK_URL = import.meta.env.VITE_ASSISTANT_WEBHOOK_URL;

const STOPWORDS = new Set([
  'a', 'al', 'algo', 'algun', 'alguna', 'algunas', 'alguno', 'algunos', 'ante', 'antes', 'como',
  'con', 'contra', 'cual', 'cuales', 'cuando', 'de', 'del', 'desde', 'donde', 'dos', 'el', 'ella',
  'ellas', 'ellos', 'en', 'entre', 'era', 'es', 'esa', 'ese', 'eso', 'esos', 'esta', 'estas',
  'este', 'esto', 'estos', 'fue', 'ha', 'han', 'hasta', 'hay', 'la', 'las', 'le', 'les', 'lo',
  'los', 'mas', 'me', 'mi', 'mis', 'mucho', 'muy', 'no', 'nos', 'o', 'para', 'pero', 'por',
  'que', 'quien', 'se', 'ser', 'si', 'sin', 'sobre', 'su', 'sus', 'te', 'tiene', 'tu', 'tus',
  'un', 'una', 'uno', 'unos', 'y', 'ya', 'yo',
]);

const SYNONYMS = {
  ia: ['inteligencia', 'artificial', 'ai', 'automatizacion', 'n8n', 'rag'],
  ai: ['ia', 'inteligencia', 'artificial', 'automatizacion'],
  automatizacion: ['automatizar', 'n8n', 'ia', 'procesos'],
  sistemas: ['sistema', 'proyectos', 'casos', 'plataformas', 'software'],
  sistema: ['sistemas', 'proyectos', 'casos', 'plataformas', 'software'],
  proyectos: ['sistema', 'sistemas', 'casos', 'portafolio'],
  experiencia: ['trayectoria', 'carrera', 'perfil', 'logros'],
  trayectoria: ['experiencia', 'carrera', 'perfil', 'logros'],
  contactar: ['contacto', 'correo', 'email', 'escribir', 'contratar'],
  contacto: ['contactar', 'correo', 'email', 'escribir', 'contratar'],
  correo: ['contacto', 'email', 'escribir'],
  contratar: ['contacto', 'disponibilidad', 'consultoria', 'precio', 'costo'],
  precio: ['costo', 'presupuesto', 'contratar', 'consultoria'],
  costo: ['precio', 'presupuesto', 'contratar'],
};

const SUGGESTIONS = [
  '¿Qué sistemas ha construido?',
  '¿Cómo puedo contactarlo?',
  '¿Qué experiencia tiene con IA?',
  '¿Cómo empiezo un proyecto?',
];

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
}

function tokenize(text) {
  return normalize(text)
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

function expand(tokens) {
  const expanded = new Set(tokens);
  for (const token of tokens) {
    const extra = SYNONYMS[token];
    if (extra) extra.forEach((word) => expanded.add(word));
  }
  return expanded;
}

function scoreChunk(chunk, tokens) {
  const titleTokens = new Set(tokenize(`${chunk.title} ${chunk.keywords.join(' ')}`));
  const bodyTokens = new Set(tokenize(chunk.text));
  let score = 0;

  for (const token of tokens) {
    if (titleTokens.has(token)) score += 3;
    if (bodyTokens.has(token)) score += 1;
  }

  return score;
}

function chunksByIds(ids) {
  return ids
    .map((id) => knowledge.chunks.find((chunk) => chunk.id === id))
    .filter(Boolean);
}

function toSources(chunks) {
  return chunks.map((chunk) => ({ title: chunk.title, topic: chunk.topic }));
}

function intakeAnswer() {
  const picked = chunksByIds(['sematrig', 'sabat', 'don-beni', 'sigraed']);
  return {
    reply:
      'Estos son los sistemas principales que ha construido:\n\n' +
      picked.map((chunk) => `• ${chunk.title}\n${chunk.text}`).join('\n\n') +
      '\n\n¿Quieres el detalle de alguno o prefieres escribir a contact@adrianbello.com?',
    sources: toSources(picked),
  };
}

export function localAnswer(question) {
  const normalized = normalize(question);

  if (/(sistema|sistemas|proyecto|proyectos|caso|casos|constru)/.test(normalized)) {
    return intakeAnswer();
  }

  if (/(contact|correo|email|escrib|llamar|reunion|hablar|contrat|disponib)/.test(normalized)) {
    const picked = chunksByIds(['contacto', 'disponibilidad', 'inicio-proyecto']);
    return {
      reply: picked.map((chunk) => chunk.text).join('\n\n'),
      sources: toSources(picked),
    };
  }

  const tokens = expand(tokenize(question));
  const ranked = knowledge.chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, tokens) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (!ranked.length) {
    return {
      reply:
        'No tengo ese detalle en el portafolio todavía. Puedo contarte su trayectoria, los sistemas que ha construido o cómo contactarlo. Para algo específico, escribe a contact@adrianbello.com.',
      sources: [],
    };
  }

  const picked = ranked.map((entry) => entry.chunk);
  const isContact = picked.some((chunk) => chunk.topic === 'contacto');

  return {
    reply:
      picked.map((chunk) => chunk.text).join('\n\n') +
      (isContact ? '' : '\n\n¿Quieres que profundice o prefieres escribir a contact@adrianbello.com?'),
    sources: toSources(picked),
  };
}

export async function answerQuestion(question, sessionId) {
  if (WEBHOOK_URL) {
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, sessionId }),
        signal: controller.signal,
      });

      window.clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        const payload = Array.isArray(data) ? data[0] : data;
        const reply = payload?.reply || payload?.output || payload?.text;

        if (typeof reply === 'string' && reply.trim()) {
          return {
            reply: reply.trim(),
            sources: Array.isArray(payload.sources) ? payload.sources : [],
            mode: 'n8n',
          };
        }
      }
    } catch (error) {
      // La UI cae al RAG local si n8n no responde.
    }
  }

  return { ...localAnswer(question), mode: 'local' };
}

export function getSessionId() {
  const key = 'ab-assistant-session';
  try {
    const existing = window.sessionStorage.getItem(key);
    if (existing) return existing;

    const id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `session-${Date.now()}`;

    window.sessionStorage.setItem(key, id);
    return id;
  } catch (error) {
    return `session-${Date.now()}`;
  }
}

export const isRemoteEnabled = Boolean(WEBHOOK_URL);
export { SUGGESTIONS };
