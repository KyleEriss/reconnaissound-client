import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateAccountPage from './CreateAccountPage';
import LoginPage from './LoginPage';
import Explore from './explore';
import LandingPage from './LandingPage';
import './App.css';

export default class App extends Component {

  state = {
    username: null
  }

  //getusername

  //setUsername



  renderMainRoutes() {
    return (
      <>
        <Route exact path="/create-account" component={CreateAccountPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/" component={LandingPage} />
      </>
    );
  }

  render() {
    return (
      <div className="App-header">
        <div className="App">
          <div>
            {this.renderMainRoutes()}
          </div>
        </div>
      </div>
    );
  }
}
