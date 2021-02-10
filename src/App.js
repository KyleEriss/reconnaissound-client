import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
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

        <div>
          <Header />
        </div>

        <div className="mainComponents">
          <Switch>

            <PublicRoute
              exact path="/" component={LandingPage}
            />

            <PublicRoute
              exact path="/login" component={LoginPage}
            />

            <PublicRoute
              exact path="/create-account" component={CreateAccountPage}
            />

            <PrivateRoute
              path="/explore" component={Explore}
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
