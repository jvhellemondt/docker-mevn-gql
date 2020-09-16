# ========= BUILD =========
FROM node:14.10.1-alpine3.12 as dist

# Create a directory to hold the application code inside the image
WORKDIR /app

# Install and cache app dependencies
COPY package.json yarn.lock /app/

RUN yarn --frozen-lockfile

# Bundle app source
COPY . /app/

RUN yarn build

# ========= RUN =========

FROM caddy:2.1.1-alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=dist /app/dist /var/www/html
