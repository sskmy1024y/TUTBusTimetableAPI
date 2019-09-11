FROM "node:12.8.1-alpine"

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

ENV HOST 0.0.0.0
EXPOSE 3000
