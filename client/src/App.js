
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import withAuth from './utils/withAuth';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginSignupPage from './pages/LoginSignupPage';

import './styles/App.css';


function App() {

return (

  <Router>

    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/profile" component={withAuth(ProfilePage)} />
      <Route path="/login-signup" component={LoginSignupPage} />
    </Switch>

  </Router>
);
}

export default App;
