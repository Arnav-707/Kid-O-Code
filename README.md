# Kid-O-Code

Welcome to the "Kid-O-code" project! In this guide, we'll introduce you to the basics of the MERN stack, a popular set of technologies used for web development. MERN stands for MongoDB, Express.js, React, and Node.js. We'll break down each component into simple, easy-to-understand steps so you can start building your own web applications.
What is the MERN Stack?

The MERN stack is a collection of technologies used to create full-stack web applications. Here's what each part does:

    MongoDB: A database that stores data in a flexible, JSON-like format.
    Express.js: A framework for building web servers with Node.js.
    React: A library for building user interfaces, especially single-page applications.
    Node.js: A JavaScript runtime that allows you to run JavaScript on the server side.

Getting Started
Prerequisites

Before you start, you should have:

    A basic understanding of JavaScript.
    Some familiarity with HTML and CSS.
    A computer with Node.js and npm (Node Package Manager) installed. You can download them from nodejs.org.

1. Setting Up the Project

First, create a new directory for your project and navigate into it:

bash

``` mkdir Kid-O-code cd Kid-O-code ``` 

2. Initialize a Node.js Project

Initialize a new Node.js project with the following command:

bash

```npm init -y```

This will create a package.json file with default settings.
3. Install Dependencies

Install the required dependencies for your project:

bash

```npm install express mongoose react react-dom react-scripts```

    express is used to build your server.
    mongoose is a library to interact with MongoDB.
    react, react-dom, and react-scripts are used for the frontend.

4. Set Up MongoDB

MongoDB is a NoSQL database that stores your data. You can use MongoDB Atlas for a free cloud database or install MongoDB locally.

    MongoDB Atlas: Go to MongoDB Atlas and create an account. Follow the instructions to create a new cluster and get your connection string.
    Local MongoDB: Follow the MongoDB installation guide to set it up on your computer.

5. Build the Server with Express

Added are two folders. Use Backend Folder to create backend structre.
#### This requires installing dependencies using: 
``` npm i ```

Make a .env in parent folder with the connection string from MongoDB Atlas or your local MongoDB instance.
6. Create a Simple React App

In your project directory, create a new React app using create-react-app:

bash

```npx create-react-app client```

This will create a new folder named client with a basic React setup.
7. Connect React to the Server

Navigate to the client directory:

bash

```cd client```

Update the src folder to fetch data from your server:

Using files from Front end folder, maintain the folder structure.

#### You may need to install the dependencies using:
```npm i ```

8. Run the Project

In one terminal, start the server:

bash

node express-server.js

In another terminal, navigate to the client folder and start the React app:

bash

cd client
npm start

Your React app should now be running on http://localhost:3000 and should display data fetched from your Express server.
Summary

Congratulations! You've set up a basic MERN stack application. Here’s what you’ve learned:

    How to create a Node.js server with Express.
    How to connect to a MongoDB database.
    How to build a simple React frontend.
    How to run both the server and the client.

Keep exploring and building new features to enhance your app. Happy coding!
Resources

    MongoDB Documentation
    Express.js Documentation
    React Documentation
    Node.js Documentation

Feel free to reach out with any questions or issues. Happy coding!