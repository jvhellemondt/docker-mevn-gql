# docker-mevn-gql

Het opzetten van een backend en een frontend headless. Het kan op allerlei manieren. Met Docker en NodeJs, zet je gemakkelijk een backend met geweldige technieken op. GraphQL, MongoDB en Express. Combineer dit met VueJs en je webapp staat als een huis.

## Docker

Make sure docker and docker-compose is installed.

### Docker installation

#### Uninstall old versions

Start clean:

`sudo apt-get remove docker docker-engine docker.io containerd runc`

#### Install docker

```bash
sudo apt-get update
sudo apt-get install docker docker-io
```

### Docker-compose

#### Install docker-compose

```bash
sudo apt-get update
sudo apt install docker-compose
```

#### Start local dev server

`docker-compose up -d`

### Using the app

The app runs at localhost. As it is using Caddy, it is automatically https.

There is an example running by default. This example contains views (Vue) and the link to graphiql. Do note, the backend is served on localhost:4000/api. However, this is served through http. Therefore, you will not be able to do mutations.

## Mongo shell

### Install mongo shell

To connect to the local mongodb, use the mongo shell.

Install via [mongodb.com](https://www.mongodb.com/try/download/community?tck=docs_server). Make sure to set the package to 'shell'.

### Connect

Use `mongo --authenticationDatabase mongodb`
