import React from 'react';
import { Router, Redirect } from '@reach/router'

import Home from "components/pages/Home";
import Login from "components/pages/Login";

import './App.scss';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Appointment Booking
        </h1>
      </header>

      <Router>
        <Redirect from="/" to="login" noThrow />
        <Login path="login" />
        <Home path="home" />
        <NotFound default />
      </Router>
    </div>
  );
}

const NotFound = () => (
  <div>Sorry, nothing here.</div>
)

export default App;
