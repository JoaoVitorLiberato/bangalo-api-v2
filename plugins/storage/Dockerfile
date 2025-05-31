FROM node:23-alpine AS builder-storage
WORKDIR /usr/src/storage
COPY package*.json /usr/src/storage
RUN npm ci --silent --production
COPY . .

FROM node:23-alpine
WORKDIR /usr/src/storage
COPY --from=builder-storage package*.json /usr/src/storage
COPY --from=builder-storage /usr/src/storage/node_modules  /usr/src/storage/node_modules
EXPOSE 4000
ENTRYPOINT [ "npm", "run", "start-storage" ]
CMD [ "--host=0.0.0.0" ]