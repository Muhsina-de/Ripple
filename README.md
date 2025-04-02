# Ripple API
An API from scratch for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. 

MongoDB is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. This project is an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. The API is built using Express.js for routing, a MongoDB database, and the Mongoose ODM.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Models](#models)
- [API Routes](#api-routes)
- [License](#license)

## Installation

1. Clone the repository to your local machine.
2. Install MongoDB on your machine. Follow the [MongoDB installation guide](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb) to install MongoDB locally.
3. Navigate to the project directory.
4. Run `npm install` to install the necessary dependencies.

## Usage

1. Start the MongoDB server by running `mongod`.
2. Run `npm start` to start the Express server. The server will start on port 3001 by default.
3. Use Insomnia to interact with the API endpoints.

## Models

### User

- `username`
  - String
  - Unique
  - Required
  - Trimmed

- `email`
  - String
  - Required
  - Unique
  - Must match a valid email address

- `thoughts`
  - Array of `_id` values referencing the `Thought` model

- `friends`
  - Array of `_id` values referencing the `User` model (self-reference)

**Schema Settings**:
  - Virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

### Thought

- `thoughtText`
  - String
  - Required
  - Must be between 1 and 280 characters

- `createdAt`
  - Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query

- `username`
  - String
  - Required

- `reactions`
  - Array of nested documents created with the `reactionSchema`

**Schema Settings**:
  - Virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

### Reaction (Schema Only)

- `reactionId`
  - Mongoose's ObjectId data type
  - Default value is set to a new ObjectId

- `reactionBody`
  - String
  - Required
  - 280 character maximum

- `username`
  - String
  - Required

- `createdAt`
  - Date
  - Set default value to the current timestamp
  - Use a getter method to format the timestamp on query

**Schema Settings**:
  - This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.

## API Routes

### `/api/users`

- `GET` all users
- `GET` a single user by its `_id` and populated thought and friend data
- `POST` a new user
- `PUT` to update a user by its `_id`
- `DELETE` to remove a user by its `_id`

### `/api/users/:userId/friends/:friendId`

- `POST` to add a new friend to a user's friend list
- `DELETE` to remove a friend from a user's friend list

### `/api/thoughts`

- `GET` to get all thoughts
- `GET` to get a single thought by its `_id`
- `POST` to create a new thought and push the created thought's `_id` to the associated user's `thoughts` array field
- `PUT` to update a thought by its `_id`
- `DELETE` to remove a thought by its `_id`

### `/api/thoughts/:thoughtId/reactions`

- `POST` to create a reaction stored in a single thought's `reactions` array field
- `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

## License

This project is licensed under the MIT License.
