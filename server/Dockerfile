# Build
FROM node:16 as build
WORKDIR /home/node/app
COPY ./server ./server
COPY ./interface ./interface
WORKDIR /home/node/app/server
RUN npm install && npm install -g typescript
RUN tsc

# Run
FROM node:16
WORKDIR /usr/src/app
COPY --from=build /home/node/app/server/build/server .
EXPOSE 9000
CMD [ "node", "main.js" ]
