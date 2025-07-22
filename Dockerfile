# Dockerfile for israel-statistics-mcp MCP server

# 1. Builder stage
FROM node:20-slim AS builder

# Create a non-root user
RUN useradd -m appuser

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy all package manifests for a full workspace install
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./

# Install all dependencies for the israel-statistics-mcp workspace package
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . ./

# Build the project
WORKDIR /app
RUN pnpm run build

# 2. Final image
FROM node:20-slim

# Create a non-root user
RUN useradd -m appuser

WORKDIR /app

# Copy entrypoint script
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Copy over the package manifests and the entire built israel-statistics-mcp app
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/package.json .
COPY --from=builder /app ./

# Install pnpm globally
RUN npm install -g pnpm

# # Expose the port the app runs on
# EXPOSE 8080

# This allows pnpm to correctly link workspace packages.
RUN pnpm install --prod

# Switch to the non-root user
USER appuser

CMD ["node", "dist/index.js"]