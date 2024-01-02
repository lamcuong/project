FROM --platform=linux/amd64 node:20-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev 

FROM deps AS builder
WORKDIR /app
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .

RUN npm run build


FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
COPY --from=builder /app/public ./public

RUN mkdir .next

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/server ./.server

EXPOSE 3005
ENV PORT=3005

CMD ["node", "server.js"]