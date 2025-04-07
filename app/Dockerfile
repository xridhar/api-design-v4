FROM node:22.14.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
USER node
CMD [ "node", "src/index.ts" ]