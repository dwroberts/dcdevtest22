# Draw and Code Test App

A small application built on the **MERN Stack** that allows visitors to register a user account, login and update their profile.

## Setting up a local version

## Clone the repo

    $ git clone https://github.com/dwroberts/dcdevtest22.git

Change directory

    cd dcdevtest22

## Installing dependencies

    npm install

    cd frontend
    npm install

## Running the application

To run the Express ackend server

    npm run server

To run the React frontend app

    npm run client

Alternatively, you can do the following

    cd frontend
    npm run dev

## Database Set Up

The app requires MongoDB to store user data. The details of the MongoD account should be set as an environment variable in a file called .env. There is an example file (.env-example) to get started.

    NODE_ENV=development
    PORT=5050
    MONGO_URI=<YOUR_MONGODB_URI>
    JWT_SECRET=<YOUR_SECRET>

# Demo

A demo of the app can be seen **[here](https://dcdevtest22.herokuapp.com)**.
