
FROM --platform=linux/amd64 node:20.10.0-alpine as base

WORKDIR /app
FROM base as deps

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev 
FROM deps as build
WORKDIR /app

COPY . .
RUN --mount=type=cache,target=/root/.npm npm ci
RUN npm run build:ncc

FROM base as final
ENV NODE_ENV production

USER node


COPY --from=build /app/dist/index.js .
EXPOSE 4000

CMD ["node", "index.js"]
