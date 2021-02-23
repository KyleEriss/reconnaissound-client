import React, { Component } from 'react';
import LandingForm from './LandingForm';
import './LandingPage.css';

export default class LandingPage extends Component {

  render() {

    return (

      <div className="landingPageClass">
        <div className="welcomeLanding">
          Welcome to Reconnaissound
        </div>
        <div className="exploreLanding">
          Explore new music videos from any country
        </div>
        <div className="playlistLanding">
          Save music videos to your playlist
        </div>
        <LandingForm />
      </div>

    )

  }
}
