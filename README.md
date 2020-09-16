# docker-mevn-gql

Het opzetten van een backend en een frontend headless. Het kan op allerlei manieren. Met Docker en NodeJs, zet je gemakkelijk een backend met geweldige technieken op. GraphQL, MongoDB en Express. Combineer dit met VueJs en je webapp staat als een huis.

## Docker

Make sure docker and docker-compose is installed.

### Docker installation

#### Uninstall old versions

Older versions of Docker were called docker, docker.io, or docker-engine. If these are installed, uninstall them:

`sudo apt-get remove docker docker-engine docker.io containerd runc`

#### Install docker

If the repository is set up, install via:

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Otherwise, [set up the repository](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository).

### Docker-compose

#### Install docker-compose

```bash
sudo apt-get update
sudo apt install docker-compose
```

#### Start local dev server

`docker-compose up -d`

## Mongo shell

### Install mongo shell

To connect to the local mongodb, use the mongo shell.

Install via [mongodb.com](https://www.mongodb.com/try/download/community?tck=docs_server). Make sure to set the package to 'shell'.

### Connect

Use `mongo --authenticationDatabase mongodb`
