# 18 NoSQL: ConnectNet-Api

## Your Task

**Walkthrough video of Mongo Compass database /Insomnia test routes :**

ConnectNet api is a social api for users to be able to share their thoughts and reactions with their friends. This is not a deployed app, but a built api that can be used to create a fully developed app by using the data stored in a database. The database used for this api is Mongo Compass [MongoDB installation guide on The Full-Stack Blog](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb). This database is used commonly because of its known flexibility and ability to store large amounts of data. This api is using express [Express.js](https://www.npmjs.com/package/express) for routing and the Mongoose package to create models for each directory in this api. There are two models used to build the users and thoughts that would be created by the user. Each thought consist of the text or body of the request, username, the date in which the thought was created and reactions if any. Additionally, the thoughts will include the reaction count in the api request, if any were to exist. Reactions will show the username, the date the reaction was made and a default id for each reaction. Routes are tested in insomnia to guarantee a well structured api. Here is the provided link, https://insomnia.rest/download. In this api, there is pre-set seeds needed to run the routes for this api. First, you will need to download all the dependencies listed here: 
<br> or run "npm i" to install all listed: <br>
"dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^8.0.1",
    "nodemon": "^3.0.1"

Mongo Database: <br>
  "You will a database such as mongoDB to store the preset seeds to test routes. After you have installed the mongoDB. Log into your mongodb using "mongosh" to confirm you have your database installed. Exit out of the mongodb and run this command in the terminal, "npm run seeds", this will store the seeds data into the mongo database. Check your database for added collections, there should be two collections made, thoughts and users." 

"Insomnia is used to test api's and test routing, you will need to install the above link. All routes are configured in the routes folder for users and thoughts. Here are some routes to try: "

**To start api, run "npm start" in terminal, once you see the message that PORT is listening on PORT 3001, you are set to go!**

**user routes:**  

/api/users  FIND ALL USERS (GET REQUEST) OR CREATE A USER (POST REQUEST) <br>
/api/users/:userId FIND ONE USER (GET REQUEST) OR DELETE A USER (DELETE REQUEST)  <br>
/api/users/:userId/update UPDATE A USER BY USER ID (PUT REQUEST) <br>
/api/users/:userId/friends/:friendId ADD A FRIEND OR DELETE USING FRIEND ID TO THE USER USING USER ID (PUT REQUEST OR DELETE REQUEST) <br>
 /api/users/:userId/thoughts CREATE A THOUGHT BY USING USER ID (POST REQUEST) <br>

**thought routes:**

/api/thoughts GET ALL THOUGHTS FROM ALL USERS (GET REQUEST) <br>
/api/thoughts/:thoughtId  GET A SINGLE THOUGHT BY THOUGHT ID (GET REQUEST OR DELETE REQUEST) <br>
/api/thoughts/:thoughtid/update UPDATE A THOUGHT BY THOUGHT ID (PUT REQUEST) <br>
/api/thoughts/:thoughtId/reactions CREATE A REACTION ON A SPECIFIC THOUGHT ID (POST REQUEST) <br>
/api/thoughts/:thoughtId/reactions/:reactionId  DELETE A REACTION ON A SPECIFIC THOUGHT ID (DELETE REQUEST) <br>

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Mock Up
![Alt text](<Assets/Screenshot (328).png>)
![Alt text](<Assets/Screenshot (330).png>)

![Alt text](<Assets/Screenshot (322).png>)

The following animations show examples of the application's API routes being tested in Insomnia.

The following animation shows GET routes to return all users and all thoughts being tested in Insomnia:

![Demo of GET routes to return all users and all thoughts being tested in Insomnia.](./Assets/18-nosql-homework-demo-01.gif)

The following animation shows GET routes to return a single user and a single thought being tested in Insomnia:

![Demo that shows GET routes to return a single user and a single thought being tested in Insomnia.](./Assets/18-nosql-homework-demo-02.gif)

The following animation shows the POST, PUT, and DELETE routes for users being tested in Insomnia:

![Demo that shows the POST, PUT, and DELETE routes for users being tested in Insomnia.](./Assets/18-nosql-homework-demo-03.gif)

In addition to this, your walkthrough video should show the POST, PUT, and DELETE routes for thoughts being tested in Insomnia.

The following animation shows the POST and DELETE routes for a user’s friend list being tested in Insomnia:

![Demo that shows the POST and DELETE routes for a user’s friend list being tested in Insomnia.](./Assets/18-nosql-homework-demo-04.gif)

