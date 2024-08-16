FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS backend
EXPOSE 4000
CMD [ "npx", "nx", "dev", "backend" ]

FROM base AS frontend
EXPOSE 3005
CMD [ "npx", "nx", "dev", "frontend" ]
