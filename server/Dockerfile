FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install && npm install typescript -g

RUN tsc

# Expose the port where server listens
EXPOSE 9000

# Start server
CMD [ "node", "main.js" ]
