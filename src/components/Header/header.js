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
                <div className="item">
                    <NavLinks.ReconHeaderLink />
                </div>

                <ul className="itemDouble">
                    <li className="itemSingle">
                        <NavLinks.ExploreLink />
                    </li>
                    <li className="itemSingle">
                        <NavLinks.PlaylistLink />
                    </li>
                    <li className="itemSingle">
                        {TokenService.hasAuthToken()
                            ? <NavLinks.LogoutLink logout={this.handleLogoutClick} />
                            : <NavLinks.LoginLink />}
                    </li>
                </ul>
            </div>


        )
    }
}