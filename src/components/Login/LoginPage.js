import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './LoginPage.css';

export default class LoginPage extends React.Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSuccess = user => {
        const { history } = this.props
        history.push('/explore')
    }

    render() {
        return (
            <div className='LoginPage'>
                <h2>Login</h2>

                <div className="loginLandingIntro">
                    <br />Just browsing? Feel free to login with these demo credentials
                    <br />
                    <br />username: TestUser
                    <br />password: Password1!
                </div>

                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
                <div className='needAccountButton'>
                    Don't have an account? Create an account <Link to='/create-account'>here</Link>
                </div>

            </div>
        )
    }
}
