# G960 Server Design Document

## REST API

### User Endpoints:

`userController.js`

| Method | API | Access | Description |
| ------ | --- | ------ | ----------- |
| POST   | /api/users/signup | Public | Endpoint for signing up a new user |
| POST   | /api/users/login | Public | Endpoint for logging in an existing user |
| GET    | /api/users/username | Protected | Endpoint to retrieve a user's username given a JWT |

### Board Endpoints:

`boardController.js`

| Method | API                      | Access    | Description                                  |
| ------ | ------------------------ | --------- | -------------------------------------------- |
| GET    | /api/boards/random       | Public    | Endpoint for generating a random chess board |
| POST   | /api/boards/save         | Protected | Endpoint for saving a board to a user's account |
| GET    | /api/boards/load         | Protected | Endpoint for loading a user's saved boards |
| POST   | /api/boards/addComment   | Protected | Endpoint for adding a comment to a saved board |
| DELETE | /api/boards/delete/:id   | Protected | Endpoint for deleting a saved board |

## Server Logic & Fetches

### User Endpoints:

- **POST /api/users/signup:**  
  This function handles the endpoint for user signup. It checks if the provided username already exists in the database, and if it does, it returns an error. Otherwise, it hashes the password using bcrypt and creates a new user record in the database.

- **POST /api/users/login:**  
  This function handles the endpoint for user login. It checks if the provided username exists in the database. If it doesn't, then it returns an error. If the user does exist, it compares the provided password with the hashed password stored in the database using bcrypt. If the passwords match, it generates a JSON Web Token (JWT) using the user's ID and a secret key. It returns a success response with the generated token.

- **GET /api/users/username:**  
  This function handles the endpoint for retrieving a user's username given a JWT. It extracts the user's ID from the JWT (provided in the request's req.user object) and looks up the corresponding user in the database. If the user is found, it returns a response with the user's username. If the user is not found, it returns an error.

### Board Endpoints:

- **GET /api/boards/random:**  
  This function generates a random chess board configuration using the FischerChessGeneration.js utility. It then sends it as a JSON response back to the client.

- **POST /api/boards/save:**  
  This function handles the endpoint for saving a board to a user's account. It receives the board configuration in the request body and the user's ID from the req.user object. It creates a new Board instance with the provided configuration and the user's ID, saves it to the database, and updates the user's savedBoards array with the saved board's ID. It returns the saved board as a JSON.

- **GET /api/boards/load:**  
  This function handles the endpoint for loading a user's saved boards. It retrieves the user's ID from the req.user object, finds the corresponding user in the database, and populates the savedBoards field to get the details of the saved boards. It returns the user's saved boards as a JSON.

- **POST /api/boards/addComment:**  
  This function handles the endpoint for adding a comment to a saved board. It receives the board ID and comment in the request body and the user's ID from the req.user object. It finds the board by the board ID and user ID to ensure it belongs to the user. It updates the board's comment field with the provided comment and saves it. It returns a success response if the comment is updated successfully.

- **DELETE /api/boards/delete/:id:**  
  This function handles the endpoint for deleting a saved board. It receives the board ID as a request parameter. It finds the board by the ID, checks if it exists, and deletes it from the database. It returns a success response if the board is deleted.

## Utilities

- **FischerChessGeneration.js**  
  This is a static javascript program that when run will generate an array of 8 characters that correspond the the pieces of a chessboard. This array will be converted to a JSON by the relevent endpoint before being sent to the client.

- **authenticateJWT.js**  
  This function is used as middleware to authenticate users in incoming requests. It takes three parameters: req (request), res (response), and next. It extracts the token from the Authorization header of the request and verifies its validity using the jsonwebtoken library. If the token is valid, the function assigns the decoded user object to the req.user property, making it available for subsequent middleware or route handlers. If the token is invalid or missing, appropriate HTTP status codes are sent as responses.

## Tooling & Libraries

- **Node.js:**  
  Node.js is a javascript runtime environment that allows for the execution of javascript code outside a browser. 

- **Express:**  
  Express is the Node.js framework that the application uses. It provides a robust set of features for web applications. It is used as the primary framework to set up the server, handle routing, and manage requests and responses in the application.

- **Mongoose:**  
  Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward and simple way to communicate with your MongoDB instance from within your server. It is used to define the data schema for users and chess board entries in the database.

- **CORS:**  
  CORS, or Cross-Origin Resource Sharing, is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin.

- **Bcrypt:**  
  Bcrypt is a library used to hash passwords. Bcrypt is used in the server to hash user passwords before storing them in the database, and to compare the hashed version of a user-input password with the stored hashed password during login.

- **Jsonwebtoken (JWT):**  
  Jsonwebtoken is used to create access tokens for secure information exchange between parties. It is used in the server to generate tokens upon login, and to verify tokens when a user attempts to access protected routes.

- **Dotenv:**  
  Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. This is used to handle the encryption password for this application.

- **Nodemon:**  
  Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. It allows for real time updates when developing an application.
