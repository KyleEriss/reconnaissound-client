import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/header';
import CreateAccountPage from './components/Create-Account/CreateAccountPage';
import LoginPage from './components/Login/LoginPage';
import Explore from './components/Explore/explore';
import LandingPage from './components/LandingPage/LandingPage';
import Playlist from './components/Playlist/playlist';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicRoute from './components/Utils/PublicRoute';
import './App.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">

        <div className="header">
          <Header />
        </div>

        <div className="mainComponents">

          <Route
            path="/explore" component={Explore}
          />

          <Route
            exact path="/" component={LandingPage}
          />

          <Switch>

            <PublicRoute
              exact path="/login" component={LoginPage}
            />

            <PublicRoute
              exact path="/create-account" component={CreateAccountPage}
            />

            <PrivateRoute
              path="/playlist" component={Playlist}
            />

          </Switch>
        </div>
      </div>

    );
  }
}
