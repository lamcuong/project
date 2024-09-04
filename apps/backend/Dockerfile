
FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

RUN addgroup --system backend && \
          adduser --system -G backend backend

COPY dist/apps/backend .
RUN npm install --production

RUN chown -R backend:backend .

USER backend

CMD [ "node","index.js" ]
