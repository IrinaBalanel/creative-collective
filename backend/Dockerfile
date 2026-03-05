FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV PORT=8002
EXPOSE 8002
CMD ["node", "index.js"]
