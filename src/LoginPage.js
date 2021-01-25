import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default class LoginPage extends React.Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/'
        history.push(destination)
    }

    render() {
        return (
            <Section className='LoginPage'>
                <h2>Login</h2>
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </Section>
        )
    }
}
