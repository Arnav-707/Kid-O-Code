# Kid-O-Code

Welcome to the "Kid-O-code" project! In this guide, we'll introduce you to the basics of the MERN stack, a popular set of technologies used for web development.That we used to build our application.

#### What is the Kid-O-Code ?

Kid-O-Code is an app that is designed to cater to people who may or may not have a technical background.Kid-O-Code defines progress with an immersive interface. We provide a place that unifies study and practice.

#### Our Features include:
- Comperhensive Code Editor with syntax highlighting.
- Quiz to test your knowledge.
- Leaderboard to see where you stand.
- Courses page to chart your next course. 


### Getting Started:
#### Prerequisites:
Before you start, you should have:

-    A basic understanding of JavaScript.
-    Some familiarity with HTML and CSS.
-    A computer with Node.js and npm (Node Package Manager) installed. You can download them from https://nodejs.org.
-    Git installed. You can download Git from https://git-scm.com

--------- 

1. Setting Up the Project

    First, Download/Clone our project on your computer:

    bash

    ``` git clone "URL" ``` 

2. Initialize a Node.js Project

    Initialize a new Node.js project with the following command:

    bash

    ```cd ~/Kid-O-Code/Front-End/ && npm -i ```

    On another terminal:

    bash

    ```cd ~/Kid=O-Code/Back-End/ && npm init -y```

    This will create a package.json file with default settings and install the dependencies

    The required dependencies for your project:

    express is used to build your server.
    mongoose is a library to interact with MongoDB.
    react, react-dom, and react-scripts are used for the frontend.

3. Set Up MongoDB

    MongoDB is a NoSQL database that stores your data. You can use MongoDB Atlas for a free cloud database or install MongoDB locally.
    MongoDB Atlas: Go to MongoDB Atlas and create an account. Follow the instructions to create a new cluster and get your connection string.
    Local MongoDB: Follow the MongoDB installation guide to set it up on your computer.

    #### On your instance of MongoDB:
    - Create a Database called "Project_BEE"
    - Add following collections
        - "Users"
        - "leaderboard"
        - "quizezs"

4. Make a .env in parent folder with the connection string from MongoDB Atlas or your local MongoDB instance.

    | KEY | VALUE |
    | ------------ | ----------------- |
    | url          | {Mongo_CONNECTION_URL} |
    | access_key   | {Your access key} |
    | refresh_key  | {Your refresh key} |
    | mail_token   | {Your mail API token} |
    | mail_sender  | {Sender mail address} |
    | mail_reciver | {Recipient mail address} |

5. Run the Project

    In one terminal, start the server:

    bash

    ``` cd Back-End &&  node express-server.js ```

    ### To run the editor page:
    You must have installed the following on your computer:
    - Python
    - C and CPP
    - Java

    In another terminal, navigate to the Fornt-End folder and start the React app:

    bash

    ``` cd Front-End && npm start ```

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