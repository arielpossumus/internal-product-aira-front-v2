FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm i --legacy-peer-deps

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]