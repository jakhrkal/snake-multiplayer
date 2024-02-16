# Build
FROM node:16 as build
WORKDIR /home/node/app
COPY ./client ./client
COPY ./interface ./interface
WORKDIR /home/node/app/client
RUN npm install && npm install -g typescript
RUN tsc

#Run
FROM nginx:latest
COPY --from=build /home/node/app/client/build /usr/share/nginx/html/
EXPOSE 80