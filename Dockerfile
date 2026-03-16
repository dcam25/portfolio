# -------------------------
# 1. Build Stage
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies needed for some node modules
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including dev for building)
RUN npm ci

# Copy the rest of the application
COPY . .

# Set environment variable for static export
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js app (creates the /out directory based on next.config.mjs)
RUN npm run build

# -------------------------
# 2. Production Stage
# -------------------------
# Since you wanted to serve static files (output: 'export'), 
# we can use a lightweight web server like Nginx
FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy the static export from the builder stage
COPY --from=builder /app/out .

# Copy custom nginx config if necessary (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
