import React from 'react';
import NavLinks from './NavLinks';
import './header.css';
import TokenService from '../../token-service';
import config from '../../config';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    state = {
        savedItems: null
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken();
        window.location.reload(false);
    }

    async componentDidMount() {
        setInterval(() => {
            this.setState({
                loggedIn: TokenService.hasAuthToken()
            })
            if (this.state.loggedIn) {
                fetch(`${config.API_ENDPOINT}/playlists`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${TokenService.getAuthToken()}`,
                    }
                })
                    .then(res => res.json())
                    .then((data) => {
                        this.setState({
                            savedItems: data.length
                        })
                        console.log(this.state.savedItems)
                    })
                    .catch(error => {
                        console.log({ error })
                    })
            }
        }, 15000);
    }

    render() {
        return (

            <div className="App-header">
                <div className="titleContainer">
                    <div className="title" data-text="Reconnaissound">
                        <NavLinks.ReconHeaderLink />
                    </div>
                </div>

                <ul className="itemDouble">
                    <li className="itemExplore">
                        <NavLinks.ExploreLink />
                    </li>

                    <li className="itemPlaylist">
                        <NavLinks.PlaylistLink />
                        {this.state.savedItems ? (
                            <div className='numberOfItems'>
                                {this.state.savedItems}
                            </div>

                        ) : (
                            <div></div>
                        )}
                    </li>

                    <li className="itemLogin">
                        {TokenService.hasAuthToken()
                            ? <NavLinks.LogoutLink logout={this.handleLogoutClick} />
                            : <NavLinks.LoginLink />}
                    </li>
                </ul>
            </div>


        )
    }
}