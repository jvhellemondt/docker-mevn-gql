# Development API

Start developing your backend with hot reload by following these steps.

## Start MongoDB

### MongoDB from root directory

`docker-compose down -v && docker-compose -f ./docker-mongodb.yml up -d`

### MongoDB from this directory

`docker-compose down -v && docker-compose -f ../docker-mongodb.yml up -d`

## Start development server

### Development server from root directory

`yarn --cwd ./api/ start`

### Development server from this directory

`yarn start`

---

## Utilities 

### Generate (64 long) secret key

Never expose your secret key -- nor store it in your version control (Github/ Gitlab etc.). If you did, always generate a new one!

#### Launch node in terminal 

`node`

#### Import crypto 

`const crypto = require('crypto')`

#### Generate secret

`crypto.randomBytes(256).toString('hex').slice(0, 64)`
