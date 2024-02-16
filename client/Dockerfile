# Build
FROM node:16 as build
WORKDIR /home/node/app
COPY ./client ./client
COPY ./interface ./interface
WORKDIR /home/node/app/client
RUN npm install && npm install -g typescript
RUN tsc

#Run
FROM nginx:1.25.4
COPY ./client /usr/share/nginx/html/
COPY --from=build /home/node/app/client/build/client /usr/share/nginx/html/client
COPY --from=build /home/node/app/client/build/interface /usr/share/nginx/html/interface
EXPOSE 80