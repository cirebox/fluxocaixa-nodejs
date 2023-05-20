FROM node:18-alpine

WORKDIR /usr/src/api

COPY . .

COPY ./.env.example ./.env

RUN npm install --force --quiet --no-optional --no-fund --loglevel=error

RUN npx prisma db push

RUN npm run build

EXPOSE 3000

CMD ["npm","run", "start:prod"]

