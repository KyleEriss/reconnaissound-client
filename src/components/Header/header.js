import React from 'react';
import NavLinks from './NavLinks';
import './header.css';
import TokenService from '../../token-service';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        window.location.reload(false);
    }

    componentDidMount() {
        this.setState({
            loggedIn: TokenService.hasAuthToken()
        })
    }

    render() {
        return (

            <div className="App-header">
                <div className="title" data-text="Reconnaissound">
                    <NavLinks.ReconHeaderLink />
                </div>

                <ul className="itemDouble">
                    <li className="itemExplore">
                        <NavLinks.ExploreLink />
                    </li>
                    <li className="itemPlaylist">
                        <NavLinks.PlaylistLink />
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