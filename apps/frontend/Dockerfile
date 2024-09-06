# FROM node:20-alpine

# WORKDIR /app

# RUN addgroup --system frontend && \
#           adduser --system -G frontend frontend

# COPY apps/frontend/public/ ./public
# COPY apps/frontend/.next/standalone/ ./standalone
# COPY apps/frontend/.next/static/ ./standalone/apps/frontend/.next/static
# WORKDIR /app/standalone/apps/frontend
# RUN chown -R frontend:frontend .
# USER frontend
# CMD [ "node" ,"server.js" ]
FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm install


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json .
COPY nx.json tsconfig.base.json .eslintrc.json jest.preset.js ./
COPY libs ./libs
COPY apps/frontend/ ./apps/frontend
RUN ls
RUN npx nx run frontend:build --verbose

RUN npm install --production

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder app/apps/frontend/public/ ./public
COPY --from=builder app/apps/frontend/.next/standalone/ ./
COPY --from=builder app/apps/frontend/.next/static/ ./apps/frontend/.next/static
WORKDIR /app/apps/frontend

EXPOSE 3000

CMD [ "node" ,"server.js" ]
