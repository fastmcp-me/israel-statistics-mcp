# Dockerfile for israel-statistics-mcp MCP server

# 1. Builder stage - Use the latest Node.js 20 image with specific version
FROM node:20.19.4-bookworm-slim AS builder

# Update packages first to get security patches
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m -u 1001 appuser

WORKDIR /app

# Install pnpm globally with latest version
RUN npm install -g pnpm@latest

# Copy all package manifests for a full workspace install
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.base.json ./

# Install all dependencies for the israel-statistics-mcp workspace package
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY src/ ./src/
COPY tsup.config.ts ./

# Build the project
RUN pnpm run build

# Remove dev dependencies and keep only production deps
RUN pnpm prune --prod

# 2. Final image - Use the same base but updated
FROM node:20.19.4-bookworm-slim

# Update packages in final image too
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m -u 1001 appuser

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

# Copy over the package manifests and the entire built israel-statistics-mcp app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/node_modules ./node_modules/

# Switch to the non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD echo '{"method":"tools/list","params":{}}' | node dist/index.js || exit 1

CMD ["node", "dist/index.js"]