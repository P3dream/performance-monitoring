# =========================
# Stage 1: Build (produção)
# =========================
FROM node:22.14.0 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# =========================
# Stage 2: Runtime (produção)
# =========================
FROM node:22.14.0-alpine AS runtime
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --production

EXPOSE 4432
CMD ["node", "dist/main.js"]

# =========================
# Stage 3: Dev (hot reload)
# =========================
FROM node:22.14.0 AS dev
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 4432
CMD ["npm", "run", "start:dev"]
