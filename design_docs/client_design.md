# G960 Client Design Document

## Utilities

**withAuth.js**:

This piece of middleware is used to prevent unregistered users from accessing the ProfilePage view. It is an example of a HOC, Higher Order Component, that takes in another component as its parameter. It checks if there is a JWToken in the browsers local storage. If a token is found then the user is authenticated and allowed to access the Profile page. If no token is found then the user is not allowed to access the Profile page.

## Components

**ChessBoard.js**:

The ChessBoard component consists of a 320px by 320px box containing an 8 by 8 grid of squares each measuring 40px by 40px. The pieces are determined by an array of characters that is given to the chess board function. The function contains a dictionary that maps white and black pieces to their respective Unicode characters via a letter that represents the piece. The squares are green and a light yellow. The relevant CSS uses flexbox and bootstrap to center the pieces within their respective squares. Once the program is called and given an initial array of pieces it will then iteratively print out each square of the board to create the final filled chess board.

**Header.js**:

The Header is a simple banner-like component that stretches across the top of the viewport with a little space between it and the top. It contains the G960 logo and appears at the top of every page within the application. The relevant CSS file colors the bar the same green color that is found on the chess board. The Logo is in a white font, centered vertically, and on the left side of the viewport.

**SideBar.js**:

The SideBar component contains links to external chess-related resources that will be useful and interesting to anyone visiting the site. These links include the rules and history of chess as a game, the rules and history of the Fisher Random Chess variation, a link to more information about Bobby Fischer, the progenitor of the Chess960 variation, and also a link to chess.com, a popular online chess website that contains invaluable tools for learning and exploration of the game. The relevant CSS centers the information vertically within the green box. The text is white, and the links are light yellow when hovered above.

## Views

**HomePage.js**:

The HomePage makes use of the header, sidebar, and chessboard components.

- **Chessboard**: 
The focus of the page is the chessboard component that is centered in the middle of the page. It is initially called with the standard starting chess board configuration. 
- **Random Button**: 
When clicked this calls the async fetchRandomBoard() function. This function sends a GET request to the /api/boards/random. After the new board configuration is recieved from the server, the chessboard component on the page will update to the new board configuration.
- **Save Button**: 
When clicked this calls the async saveBoard() function. This function first checks if the user is signed in by looking for a JWToken. If one is not found, then the user is not logged in, and they are redirected to the LoginSignup page. If a token is found and the user is validated, then it sends a POST request to api/boards/save. If the board was saved correctly then it will appear in a user's profile when they next navigate to that screen.
- **Log In Button**: 
When clicked this calls the navigateToLoginSignup() function. This function first checks if the user is signed in by looking for a JWToken. If one is not found, then the user is redirected to the LoginSignup page. If a token is found and the user is logged in, they will instead be redirected to their Profile page.
- **Profile Button**: 
When clicked this calls the navigateToProfile() function. This function simply redirects the user to their profile page. A guest user will be unable to redirect to the profile page due to the page being protected with the withAuth.js utility in the main App.js.
(<Route path="/profile" component={withAuth(ProfilePage)} />)

**LoginSignupPage.js**:

The LoginSignupPage makes use of only the header component. There are two text input fields on the page labeled Username and Password. Both of the fields take the entered text and assign them to variables using the React .useState() function. There are then two buttons the user can press to interact with these variables.

- **Title**: Simply a title telling the user they are at the Login/Signup page.
- **Log In Button**: When clicked this calls the async handleLogin() function. This function sends a POST request to the /api/users/login containing the username and password supplied by the user. It then awaits a response from the server. If the response is ok, then a JWToken is created and saved in local storage and the user is redirected to the Profile page. If the login is unsuccessful, then text will appear underneath the text fields stating the reason for the error.
- **Sign Up Button**: When clicked this calls the async handleSignup() function. This function sends a POST request to the /api/users/signup containing the username and password supplied by the user. It then awaits a response from the server. If the response is ok, then a JWToken is created and saved in local storage and the user is redirected to the Profile page. If the login is unsuccessful, then text will appear underneath the text fields stating the reason for the error.
- **Home Button**: When clicked this button calls the navigateToHome() function, which simply redirects the user back to the Home page.

**ProfilePage.js**:

The ProfilePage makes use of the header, sidebar, and chessboard components. The focus of the page is a vertical list containing all of the players saved boards. Each board contains an assortment of buttons and textboxes associated with it. These will be described in detail further below. When the page is loaded it first makes a call to the async fetchUserData() function. This function will send a GET request to /api/boards/load. It then saves the list of the user's boards for use later on in the page.

- **Title**: The title states the username of the currently signed in user above their list of saved boards. This info was gained when the page first loaded and called the async fetchUserData() function. The function made a GET request to /api/users/username, and then stored the username.
- **Home Button**: When clicked this button calls the navigateToHome() function, which simply redirects the user back to the Home page.
- **Log Out Button**: When clicked this button calls the handleLogout() function, which removes the user's JWToken and redirects them to the Home page.

The rest of the page centers around the user's list of saved boards. Each board contains:

- **Board Title**: This title is given to each board based off their placement within the user's saved board array that was generated by the earlier use of the fetchUserData() function.
- **Delete Board Button**: When clicked this calls the async handleDelete() function. This function sends a DELETE request along with the Board's unique database ID to the /api/boards/delete. This change is immediately reflected on the current page's list of saved boards.
- **ChessBoard View**: This is the ChessBoard component. The list of all saved baords arecalled iteratively and each configuration is then turned into a chessboard component and displayed on the screen.
- **Comment Box**: This element displays the current comment attached to the board in the database. It is read only, until the Edit Button below it is clicked.
- **Edit Button**: When clicked this calls the async handleEdit() function. The function saves the current boardID and the currnet comment. The textbox will then be able to be edited and two additional buttons will appear, Save, and Cancel.
- **Save Button**: This button only appears after clicking the Edit Button. When clicked this calls the async handleSave() function. This function makes a POST request to api/boards/addComment. It sends the comment currently typed in the textbox as the new comment. So In order to delete a comment one only has to erase the currently existing comment and then click the Save button. Once clicked the Save and Cancel Buttons will disappear and the Edit Button will return.
- **Cancel Button**: This button only appears after clicking the Edit Button. When clicked this calls the async handleCancel() function. This function simply turns the textbox back to it's initial state before the button was clicked. Once clicked the Save and Cancel Buttons will disappear and the Edit Button will return.

### Tooling & Libraries

- **HTML**: HyperText Markup Language is the standard markup language for web pages. The page elements are written in HTML.
- **CSS**: Cascading Style Sheets is a style sheet language used for describing the look and formatting of a document written in HTML. Custom CSS was used in this application's design.
- **Bootstrap**: A popular CSS Framework for developing responsive  websites. Bootsrtap was used heavily in the placing and organizing of elements visually throughout the application.
- **Flexbox**: A CSS layout module that allows elements within a container to be automatically rearranged depending upon screen size.
- **JavaScript**: A high-level, interpreted programming language used to make web pages interactive. All of the logic embedded with the app's views are written in JavaScript.
- **React**: A JavaScript library for building user interfaces in within websites. This entire application was built on React. The application is single page, and uses React to dynamically generate the necessary HTML for each page.
- **JSON**: JavaScript Object Notation, is a data container format widely used and recognized in web development. All of my data either sent to, or coming in from the server is packaged as a JSON.
