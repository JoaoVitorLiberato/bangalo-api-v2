FROM oven/bun:1.2.2-slim

# Install Chrome dependencies
# RUN apt-get update && apt-get install -y \
#     chromium \
#     chromium-driver \
#     --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Install bun
# RUN curl -fsSL https://bun.sh/install | bash

# Copy package files
COPY package.json ./

# Install dependencies
# RUN bun install

# Copy source code
COPY . /usr/src/app

# Set environment variables for Puppeteer
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Expose port
EXPOSE 4001

# Start the bot
CMD ["bun", "run", "dev"]