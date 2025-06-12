# =========================
# STAGE 1: Build (instala dependências)
# =========================
FROM oven/bun:1.2.2-slim AS build

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install

COPY . .

# Se usar TypeScript, descomente:
# RUN bun run build

# =========================
# STAGE 2: Runtime (apenas o necessário)
# =========================
FROM debian:bullseye-slim

# Instala Chromium e dependências mínimas para rodar Puppeteer/whatsapp-web.js
RUN apt-get update && apt-get install -y \
    chromium \
    unzip \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libnspr4 \
    libnss3 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    curl \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Instala o Bun
RUN curl -fsSL https://bun.sh/install | bash && \
    cp /root/.bun/bin/bun /usr/local/bin/bun

WORKDIR /app

# Copia só o necessário do build
COPY --from=build /app /app

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

EXPOSE 5000

CMD ["bun", "run", "dev"]