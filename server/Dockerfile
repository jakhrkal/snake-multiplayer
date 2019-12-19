FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install websocket dependency
RUN npm install ws

# Bundle app source
COPY . .

# Expose the port where server listens
EXPOSE 9000

# Start server
CMD [ "node", "main.js" ]
