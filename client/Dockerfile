#FROM is the base image for which we will run our application
FROM nginx:latest

RUN npm install && npm install typescript -g

# Copy files and directories from the application
COPY . /usr/share/nginx/html

RUN tsc

# Tell Docker we are going to use this port
EXPOSE 80