import React, { Component } from 'react';
import Explore from '../Explore/explore';
import './LandingPage.css';

export default class LandingPage extends Component {

  static defaultProps = {
    history: {
      push: () => { },
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/explore')
  }

  componentDidMount() {
    setTimeout(() => {
      const { history } = this.props
      history.push('/explore')
    }, 12000)
  }

  render() {

    return (
      <div>
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
        </div>
      </div>

    )

  }
}
