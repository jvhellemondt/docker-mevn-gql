# Select version from https://hub.docker.com/_/node
FROM node:14.10.1-alpine3.12 as builder

# Create a directory to hold the application code inside the image
WORKDIR /app

# Install and cache app dependencies
COPY package.json yarn.lock /app/

RUN yarn --frozen-lockfile

# Bundle app source
COPY . .

RUN yarn build

# Select version from https://hub.docker.com/_/caddy
# FROM caddy:2.1.1-alpine

# COPY conf/caddyfile /etc/caddyfile
# COPY --from=builder /app/dist /usr/share/caddy/html