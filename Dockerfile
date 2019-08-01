FROM node:10

WORKDIR /src/
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 80

ENTRYPOINT [ "npm", "start" ]
