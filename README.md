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

## Ruby API:

Ensure that you are using the correct ruby version:

```
$ rvm use 2.5.1
```

Ensure that all ruby gems are installed:
```
$ bundle
```

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
