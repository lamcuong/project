
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json .

RUN npm install

FROM deps AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY nx.json tsconfig.base.json .eslintrc.json jest.preset.js ./
COPY libs ./libs
COPY apps/backend ./apps/backend
# RUN addgroup --system backend && \
#           adduser --system -G backend backend
RUN npx nx run backend:build --verbose
RUN npm install --production

FROM node:20-alpine AS runner

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/backend ./backend

WORKDIR /app/backend
# RUN chown -R backend:backend .

# USER backend

CMD [ "node","index.js" ]
