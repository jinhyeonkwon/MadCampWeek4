# Example Prisma + Express + React (JS) Project Setup for SPARCS Newbie Seminar (by Night)

## How to Run

### Operating System

1. This project template uses `Makefile`, `Environment Variables`, `Bash Scripts` which may encounter some trouble in non-UNIX systems
2. Using Linux / MacOS OR WSL2 is recommended

### Installing Docker

Using `Docker` is required to use the packaged `postgres` database

For Linux Systems, note [Docker Installation Docs](https://docs.docker.com/engine/install/ubuntu/)

For MacOS / Windows, [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

* For Windows, you must [Enable WSL integration](https://learn.microsoft.com/ko-kr/windows/wsl/tutorials/wsl-containers)

**[Common Errors]**

```
Error response from daemon: Bad response from Docker engine
```

* Check if Docker Desktop is runninng

```
docker: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.35/containers/create: dial unix /var/run/docker.sock: connect: permission denied. See 'docker run --help'.
```

* Docker requires SUDO privileges to run.

### Setting up .env Files

Environment variables are used to manage  environment-specific values (like port numbers, API Endpoints etc.) and secrets.

.env.* files are NOT uploaded to Git using `.gitignore`

Environment variables can be defined by adding `KEY=VALUE` pairs in `.env` files. (This is loaded through `vite` or `dotenv` or `docker`)

Environment variables can be accessed in JavaScript using `process.env.VARIABLE_NAME`


**[DATABASE]**

- `cp .docker/.env.example .docker/.env`
- Edit POSTGRES_PASSWORD Field

**[SERVER]**

- Development (with yarn dev / yarn start)
  - `cp server/.env.development.example server/.env.development`
  - This environment will only get loaded  in development 

- Production (with yarn production)
  - `cp server/.env.production.example server/.env.production`
  - This environment will only get loaded in production

**[CLIENT]**

- Development (with yarn dev)
  - `cp client/.env.development.example client/.env.development`
  - This environment will only get loaded in development
  - DO NOT PUT SECRETS IN CLIENT .env (This will be sent to the user)
- Production (with yarn build -> dist)
  - `cp client/.env.production.example client/.env.production` 
  - This environment will only get loaded in production
  - DO NOT PUT SECRETS IN CLIENT .env (This will be sent to the user)

### Installing Packages

`node v18.12` is required.
Install using `nvm use`.

It is recommended to use `yarn v1`
`npm install --global yarn`

Yarn v1 is fully compatible with NPM.

- `yarn install`
- `cd client && yarn install`
- `cd server && yarn install`

When adding packages, **Remember to check the Current Working Directory**

`yarn add <Package Name>` for CLIENT (REACT) should **only** be installed in `/client`

`yarn add <Package Name>` for SERVER (EXPRESS) should **only** be installed in `/server`

**DO NOT INSTALL PACAKGES AT PROJECT ROOT**

### Starting the Server
**RUN ALL OF THE FOLLOWING COMMANDS @ PROJECT ROOT** 
- `make run-dev`
  - Starts the Postgres server @localhost:POSTGRES_PORT
- `make stop-dev`
  - Stops the Postgres server
- `yarn dev`
  - Starts Dev Servers for both Client & Server
  - Fully Supports Hot-Reloading


****

## Folder Structure (Monorepo)

### /

- The root directory
- You can run `yarn dev` to run both client & server locally at the same time
- You should **almost never** run `yarn add` in the root directory
- Contains Makefiles to run Docker Container containing Postgres

### /client

- The client directory
- Contains React + FrontEnd Code (in JS)
- Uses Vite (SWC)

### /server

- The server directory
- Contains Express + Prisma Setup

****

## DB Migration
- `cd server && npm run prisma:migrate-dev`