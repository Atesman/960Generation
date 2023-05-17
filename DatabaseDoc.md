# G960 Database Design Document

## Schemas

### User Schema:

```javascript
const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  savedBoards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
    },
  ],

});
```

Includes:

- `username` - Unique and required string representing the user's username
- `password` - Required string that holds the user's hashed password
- `savedBoards` - Array of ObjectIds. These IDs reference the Board model, which holds the user's saved boards.

### Board Schema:

```javascript
const BoardSchema = new mongoose.Schema({

  configuration: {
    type: [String],
    required: true,
  },

  comment: {
    type: String,
    default: "",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

});
```

Includes:

- `configuration` - Required array of strings. This represents that board state.
- `comment` - String with a default value of an empty string. This field holds any user comments about the board configuration.
- `user` - An ObjectId that references the User model. It represents the user that the board is associated with.

## Query Logic

### User Model:

- Select: Uses the User model's `findOne` method to retrieve users by their username or ID
- Insert: Uses the User model's `save` method to store a new user to the database

### Board Model:

- Select: Uses the Board model's `findOne` method to retrieve boards by their ID
- Insert: Use the Board model's `save` method to store a new board to the database

## CRUD Operations

User Model:

- Create: When a new user signs up, a new user instance is created and saved in the database. This handled in the POST /api/users/signup endpoint.
- Read: Whenever a user logs in their username is read within the user model. This handled in the POST /api/users/login endpoint.
- Update: There is currently no implementation that updates the user model directly, except for when a board is deleted, then the corresponding board ID is deleted from the User's savedBoards array.
- Delete: There is currently no implementation that involves deleting a user.

Board Model:

- Create: When a user saves a new board, A new instance is created and saved in the database. This is handled in the POST /api/boards/save endpoint.
- Read: When on the profile page and loading a users saved boards the user is found in the database and the boards are loaded based on their ID within the user's savedBoards array. This is handled in the GET /api/boards/load endpoint.
- Update: Whenever a user adds edits or deletes a comment on a board this is done via the POST /api/boards/addComment endpoint.
- Delete: When a user deletes a saved board, the board is found in the database and deleted. This is handled in the DELETE /api/boards/delete/:id endpoint.

## Tooling & Libraries

The database management system used in this app is MongoDB, a NoSQL database that stores data in JSON-like documents. The middleware between this database and the Node.js Server is Mongoose, a MongoDB object modeling tool. It is used to define the data schema and perform operations on the data. These operations include creating, reading, updating, and deleting instances of the User and Board models.
