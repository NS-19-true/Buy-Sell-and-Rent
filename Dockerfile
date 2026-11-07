FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
# The API server has no third-party dependencies, so nothing is installed here.
# (The Taro mini program in src/ is built on your machine, not in this image; see .dockerignore.)
COPY . .
RUN mkdir -p /app/data && chown -R node:node /app
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=3s --retries=3 CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "server/server.js"]
