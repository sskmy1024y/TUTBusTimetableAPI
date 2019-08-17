FROM "node:12.8.1-alpine"

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

CMD ["sh"]
