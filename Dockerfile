
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

# 2. Final stage - Use distroless to eliminate PAM and other system vulnerabilities
FROM gcr.io/distroless/nodejs20-debian12:latest

# Copy the built application from builder
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

# Set working directory
WORKDIR /app

# Distroless runs as nobody (65534) by default - no need to change user

# Health check (distroless doesn't have shell, so we can't use complex healthchecks)
# The container will be monitored externally

# Run the application
CMD ["dist/index.js"]