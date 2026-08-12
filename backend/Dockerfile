FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install --production

COPY backend/src ./src

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["npm", "start"]
