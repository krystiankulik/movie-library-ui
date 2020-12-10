# Install movie-library-ui

React client app for gastromatic movie api

See live demo: <a href="http://movielibrary.ml">movielibrary.ml</a>

## Setup Without Docker

Node version 14 is needed to run the project

```
npm ci
npm run start
```

Test running server by accessing `http://localhost:3000/`

## Setup with Docker

Docker and docker-compose need to be installed. To start the services run

```
docker-compose build
docker-compose up
```

Test app server by accessing `http://localhost:80/`
