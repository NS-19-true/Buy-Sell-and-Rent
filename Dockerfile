FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
# No third-party dependencies, so nothing to install yet.
# When you add some, replace this with: COPY package-lock.json ./ && RUN npm ci --omit=dev
COPY . .
RUN mkdir -p /app/data && chown -R node:node /app
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=3s --retries=3 CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "server/server.js"]
