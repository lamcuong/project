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
ENV NEXT_PUBLIC_BASE_URL=/api
ENV NEXTAUTH_URL=https://lamvietcuong.com
ENV NEXTAUTH_SECRET=fDEEKBxFp/aT+btSFE50/WAZ+GJGj7Q/6tXMqPFM0F0
ENV NEXT_PUBLIC_SECRET_KEY=wenlygo

ENV GOOGLE_CLIENT_ID=710835032991-mmsj4enlt1d8hri5baf3fhjf074ic0pt.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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

COPY --from=builder /app/public ./public

RUN mkdir .next

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/server ./.server

EXPOSE 3005
ENV PORT=3005

CMD ["node", "server.js"]