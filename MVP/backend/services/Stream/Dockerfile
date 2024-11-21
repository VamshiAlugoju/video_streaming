FROM node

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 4001

CMD [ "node" , "./dist/app.js" ]