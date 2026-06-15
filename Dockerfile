# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies (cached as a separate layer)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts postcss.config.js tailwind.config.js index.html ./
COPY src ./src

RUN npm run build

# ---- Runtime stage ----
FROM nginx:1.27-alpine

# Replace the default nginx site with our SPA-aware config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Serve the built Vite output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
