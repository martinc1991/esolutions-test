# e-solutions-test

<p align='center'>
    <img width="200" src="/assets/logo.png">
</p>

## Introduction

This is an Node-Express API with and SQLite database.

## How to run the project

1. Clone this repository and install dependencies

```js
// clone
git clone https://github.com/martinc1991/esolutions-test.git
```

2. Go to the _root folder_ (the folder created in the previous step) and install dependencies

```js
// in the root folder
npm install
```

3. Finally, simply run the next command in the _root folder_:

```js
// root folder
npm start
```

or

```js
// root folder
npm run dev // with nodemon
```

## Documentation

Once the API is running, you can access the docs on your browser just typing:

```js
http://localhost:5000/api-docs/
```

## Postman Documentation

If you want to test de API with [Postman](https://www.postman.com/), there's a file in the root named _esolutions-test.postman_collection.json_. You can import that collection and immediately have all the routes to test. If you don't know how to import a collection, here is a [video](https://youtu.be/FzPBDU7cB74?t=86).

## Testing

To run the automated test, just run:

```js
// root folder
npm run test
```

## Notes

- I decided to use SQLite (over Postgress or Mongo) because it is the simplest to setup. It doesn't require any installations or anything.
- Right now, the API is configured to create a new database in every startup, so data won't persist when you stop the server (although is it easily changed in app.js just changing the 'force' option to false)

## To-Do List

- Add script to auto-generate a populated database
- Add configuration to decide wether to persist or not the data in database
