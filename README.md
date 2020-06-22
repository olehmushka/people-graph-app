# People Graph Application

## Installation
The microservice requires a local installation of Node.js using [specific version](https://nodejs.org/uk/download/) only or use [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md) and choose an appropriate version. See version in package.json 

Additionally it is required to point the application to [Neo4j](https://neo4j.com/download/) database server running either on AWS or locally. In case of local  instance, you should use [Docker](https://www.docker.com/products/docker-desktop) via docker-compose, which will run up the Neo4j instance along with application when the environment is configured appropriately. Besides, it is required to install [PostgreSQL](https://www.postgresql.org/download/) database server. In case of local running it should be run with [Docker](https://www.docker.com/products/docker-desktop) via docker-compose, which will run up the Neo4j instance along with application when the environment is configured appropriately.

Tasks:
* Add endpoints:
  - GET /location/state/:id
* Implement location endpoint in gRPC server
* Add relationships between persons
* Add relationships between persons and locations
* Use more services in `https://photius.com/rankings/index.html`
* Use meteo services
* Replace Promises to Observables

## Configuration
For correct work of the service, the list of environment variables have to be filled appropriately. While filling up the values, start by copying the `.env.example` template to system-required `.env` file by command:
```
cp .env.example .env
```
Thereafter these variables must be filled by values according to their definition below.

#### Environment variables

```
NAME - definition (default value)

# Application
LOG_LEVEL - pino logger loglevel (info)
DATETIME_FORMAT - datatime format of application (YYYY-MM-DDTHH:mm:ssZ)

# Servers
HTTP_SERVER_PORT - port of HTTP server (3000)
HTTP_BASE_PATH - base path for http server (/)
HTTP_SWAGGER_BASE_PATH - base path of swagger (/)
GRPC_SERVER_PORT - port of gRPC server (3001)

# Neo4j
NEO4J_URI - URI of neo4j for connection
NEO4J_USER - neo4j's user
NEO4J_PASSWORD - neo4j's password for NEO4J_USER user
NEO4J_PORT - port of Neo4j's server (7687)
NEO4J_ADMIN_PORT - port of Neo4j's admin server (7474)
NEO4J_dbms_memory_pagecache_size - memory page cache size in Neo4j (1G)
NEO4J_dbms.memory.heap.initial_size=1G - heap initial size in Neo4j (1G)
NEO4J_dbms_memory_heap_max__size - heap max size in Neo4j (1G)

# PostgreSQL
POSTGRES_DB - name of PostgreSQL database (db)
POSTGRES_HOST - host of PostgreSQL server (localhost)
POSTGRES_PORT - port of PostgreSQL server (5432)
POSTGRES_USER - PostgreSQL's user
POSTGRES_PASSWORD - PostgreSQL's password for POSTGRES_USER user

# Services
WIKIPEDIA_HOST - host of wikipedia
WIKIPEDIA_COUNTRIES_PATH - wikipedia's path for getting countries list
GEOGRAPHIC_HOST - host of geographic service
GEOGRAPHIC_COUNTRY_CODES - geographic's path for getting country codes list
REST_COUNTRIES_HOST - host of REST countries service
REST_COUNTRIES_COUNTRIES_V2_PATH - REST countries service's path for getting countries list
INSTAGRAM_HOST - host of instagram
INSTAGRAM_LOGIN_PATH - instagram's path for login page
INSTAGRAM_LOGIN_EMAIL - email for instagram account
INSTAGRAM_LOGIN_PASSWORD - password for instagram account
```

These might be appended by additional variables for local deployment in .env file. See .env.example file for default environment definition.

## Operations
After all the configurations above are done, these operations can be performed:
To build a service, run the commands below in project folder:
```
$ yarn install
$ yarn build
```
To start a standalone service, run the commands below in project folder:
```
$ yarn start
```
To run a service's tests coverage, run the commands below in project folder:
```
$ yarn test:coverage
```
To generate typescript models according to swagger file, run the commands below in project folder:
```
$ yarn http:generate:models
```
To generate javascript code for gRPC server according to proto files, run the commands below in project folder:
```
$ yarn grpc:generate:proto
```
To run a SQL migration to create tables, run the commands below in project folder:
```
$ yarn sql:create-tables
```
To run a SQL migration to drop tables, run the commands below in project folder:
```
$ yarn sql:drop-tables
```
To run a SQL migration to create views, run the commands below in project folder:
```
$ yarn sql:create-views
```
To run a SQL migration to drop views, run the commands below in project folder:
```
$ yarn sql:drop-views
```

## Versioning

We modify app version according to [Semantic Versioning](https://semver.org/) documentation.
But it can be changed only after release:
Examples:

- `*.1.*` to `*.2.0` if a release contains features;

- `*.*.1` to `*.*.2` if a release contains bug fixing;

## Maintainers
- Oleh Mushka
