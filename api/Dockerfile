# Select version from https://hub.docker.com/_/node
FROM node:14.10.1-alpine3.12

# Create a directory to hold the application code inside the image
WORKDIR /app

# Install and cache app dependencies
COPY package.json yarn.lock /app/

RUN yarn --production --frozen-lockfile

# Bundle app source
COPY . /app/

# On which port should the app be served
EXPOSE ${PORT}

# Set command to run the app
CMD [ "yarn", "start" ]
