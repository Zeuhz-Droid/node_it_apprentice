# Node.js Application

## Table of Contents

- [Node.js Application](#nodejs-application)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Access the application](#access-the-application)
    - [Scripts](#scripts)
    - [API Endpoints](#api-endpoints)

## Introduction

This is a basic Node.js application with a MongoDB backend. It provides CRUD operations for managing tasks.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   npm install
   ```

- Create a .env file in the root of your project and add the following variables as shown in .env.example

- Start the development server

```sh
npm run dev

```

- Start the production serve

```sh
npm start

```

### Access the application

- Open your browser and navigate to <http://localhost:3000>
-

### Scripts

- Start the application: npm start
- Start the development server with nodemon: npm run dev
- Lint the code: npm run lint
- Run tests: npm test

### API Endpoints

- GET /tasks: Retrieve all tasks
- POST /tasks: Create a new task
- GET /tasks/
  : Retrieve a specific task by ID
- PUT /tasks/
  : Update a specific task by ID
- DELETE /tasks/
  : Delete a specific task by ID
