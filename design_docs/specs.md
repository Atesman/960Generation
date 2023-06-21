
# G960 Project Specifications Document

## User Stories

### Guest Users:

- Can generate a new, valid Chess960 board configuration
- Can learn the rules and history of both standard chess and Fischer Random Chess
- Can create a new profile and begin to save their favorite randomly generated boards

### Regular Users:

- Have access to all the features that guest users have, as well as:
  - Can save favorite board configurations to their account.
  - Can login to their account and view a list of previously saved board states.
  - Can add, edit, or delete comments to saved board configurations.
  - Can delete saved board configurations.

## Frontend Features

The frontend of this application is created using React. This allows for a modular and responsive user experience.

### HomePage View:

This is the central hub of a user's experience. It contains:

- The display of the randomly generated board
- A button to generate a new random board
- A button to save a newly created board
- A button to go to the signup/login page
- A button to go to a user's own profile
- A header and sidebar containing links to material regarding chess

### Signup/Login View:

Where a user can either create or log in to an account. It contains:

- Fields where a user can enter in a username and password
- A button to signup and create a new user
- A button to log in an existing user
- A button to return to the HomePage
- Visible error messages for various signup/login errors
- A header component

### Profile View:

Where a user can manage their saved boards. It contains:

- A display of the user's username
- A rendered display of all the user's previously saved boards
- A button to return to the HomePage
- A button to log the user out
- A header and sidebar containing links to material regarding chess

Each saved board contains:

- A numbered title for the board
- A button to delete the board
- A rendered view of the board
- A textbox containing any saved comments about the board
- A button that allows the editing of comments
- Save and Cancel buttons that appear when editing a comment

## Backend Features

### Technologies:

- Node.js - Node is the javascript runtime environment that my server uses to run javascript outside of the browser.
- Express.js - Express is the framework holding the application together as it handles user/board routing, authentication, and board generation middleware.
- Mongoose - The database for this app uses MongoDB. Mongoose provides an easy and straightforward way for my server to interact with my database for queries, edits, deletions, etc.
- bcrypt - This is the library used to hash and authenticate user passwords in the database.
- jsonwebtoken (JWT) - The library used to generate web tokens to keep a user logged in and authenticated during their session.

### Board Generation:

- Uses a static javascript function called FischerChessGeneration.js
- Whenever the server receives a GET request for a new random board, this function runs and returns the board data.
- The BoardController will then package that data into a json and return it to the client.
- The generating of the board graphics are done client-side as to limit the strain on the server.

### User Authentication:

- Uses bcrypt to handle the creating and comparing of passwords on the server.
- Uses JWT to generate and pass tokens so that a user can maneuver through the site and access only appropriate features.

### UserRoutes/Controllers:

- Sign up and create a new account
- Log in to an existing account
- Retrieve a given User's Username given a JWT

### BoardRoutes/Controllers

- Allows for the previously mentioned Board Generation
- Interacts with the database to save/load/delete a user's boards
- Interacts with the database to save/load/edits comments related to any one given board

## Database Features

The database is a MongoDB database that will be interacted with through Mongoose on the server-side.

- User Data: Stores user credentials and manages user account information
- Board Configuration: Stores saved board configurations, associated with user accounts
- Comments: Stores comments associated with saved board configurations
