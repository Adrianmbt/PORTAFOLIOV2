FROM node:22-alpine

WORKDIR /app

COPY ingest.js ./ingest.js

ENV KNOWLEDGE_PATH=/workspace/src/data/knowledge.json

CMD ["node", "ingest.js"]
