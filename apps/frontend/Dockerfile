FROM node:20-alpine

WORKDIR /app

RUN addgroup --system frontend && \
          adduser --system -G frontend frontend

COPY apps/frontend/public/ ./public
COPY apps/frontend/.next/standalone/ ./standalone
COPY apps/frontend/.next/static/ ./standalone/apps/frontend/.next/static
WORKDIR /app/standalone/apps/frontend
RUN chown -R frontend:frontend .
USER frontend
CMD [ "node" ,"server.js" ]