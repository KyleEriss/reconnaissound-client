import React, { Component } from 'react';
import LandingForm from './LandingForm';
import './LandingPage.css';

export default class LandingPage extends Component {

  render() {

    return (

      <div>
        <div classname="introduction">
          Welcome to Reconnaissound!
          <br />
          <br />
          Explore new and trending music videos in any country in the world.
          <br />
          <br />
          To start, simply create an account, begin your search under the Explore tab, and save any of the content you like to your playlist.
          <br />
          <br />
          Under the Playlist tab you can review and modify your list saved music videos.
          <br />
          <br />
          Enjoy!
        </div>
        <div>
          <LandingForm />
        </div>
      </div>

    )

  }
}
