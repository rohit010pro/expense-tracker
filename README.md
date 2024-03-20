# Expense Tracker

This is simple Personal Expense Tracker web application.

Technologies used:
- MongoDB
- ExpressJS
- Angular
- NodeJS


To install the dependencies, run this in the '/client' and '/server; directory from the command-line:

```bash
$ npm install
```

<br/>

# Client

Client directory is the frontend of this application.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run below command for a dev server in the '/client' directory. 

```bash
$ ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

<br/>


# Server

Server directory is the backend of this application.

## Backend server

Run below command in the '/server' directory to start server.
 
```bash
$ npm run server
```

Server will start at `http://localhost:3000`. The server will automatically reload if any of the source files changes.

## MongoDB setup

Create ".env" file in the server directory and paste the below code.

```js
# MongoDB Connection String
MONGO_URI="your_mongodb_connection_string"

# Server port
PORT=3000
```