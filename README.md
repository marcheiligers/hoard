# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...

## Client

The client runs on "http://localhost:5000/home/index".
The client needs the correct Ruby version to run:

```
$ rvm use 2.5.1
```

Then start the client:

```
$ foreman start
```

## Jest with Babel 7

Run client side tests and exit with:

```
$ yarn test
```

To watch while testing, run:

```
$ yarn test-watch
```

When babel-jest finally reaches a point where it can depend directly on @babel/core: ^7.0.0, remove the dependency on "babel-core": "^7.0.0-bridge.0". The bridge dependency is [A placeholder package that bridges babel-core to @babel/core](https://github.com/babel/babel-bridge).

## Server
Start the rails server on port 5000 with:
```
$ rails server
```
To start the server on a different port, pass the `-p` flag, followed by the desired port number. For example, to start the server on port 3090, run:
```
$ rails server -p 3090
```
One can now make requests to the API with, e.g.
```
GET http://localhost:3090/api/v1/stocks
```
The api endpoints used by the frontend at the moment are:
GET {{baseUrl}}/api/v1/stocks
POST {{baseUrl}}/api/v1/stocks
GET {{baseUrl}}/api/v1/stocks/{id}
PUT {{baseUrl}}/api/v1/stocks/{id}
DELETE {{baseUrl}}/api/v1/stocks/{id}
GET {{baseUrl}}/api/v1/companies/{stockSymbol}
GET {{baseUrl}}/api/v1/companies/{stockSymbol}/chart/date/{date}

where {date} is of the format YYYYMMDD
