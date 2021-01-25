import React from 'react';
import ApiContext from "./ApiContext";
import config from './config';
import LinkButton from './LinkButton';
import { newUser, AuthApiService } from './ApiService';
import TokenService from './token-service';
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {

    state = {
        username: "",
        password: "",
        usernameError: "",
        passwordError: "",
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    validate = () => {
        let username = this.state.username;
        let password = this.state.password;
        let usernameError = this.state.usernameError;
        let passwordError = this.state.passwordError;

        if (!username) {
            usernameError = "username cannot be blank";
        }

        if (!password) {
            passwordError = "password cannot be blank";
        }

        if (usernameError || passwordError) {
            return this.setState({ usernameError, passwordError });
        }

        return true;
    };


    handleSubmit = event => {
        event.preventDefault();

        const username = this.state.username;
        const password = this.state.password;
        let passwordError = this.state.passwordError;
        const isValid = this.validate();

        if (!isValid) {
            return false;
        }

        // if (isValid) {
        //     this.setState(initialState);
        // }

        AuthApiService.postLogin({
            username: username.value,
            password: password.value,
        })
            .then(res => {
                username.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        return (
            <div>
                <input
                    name="username"
                    placeholder="enter username"
                    value={this.state.username}
                    onChange={this.handleChange}
                />

                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.usernameError}
                </div>

                <input
                    type="password"
                    name="password"
                    placeholder="enter password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />

                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.passwordError}
                </div>

                <button onClick={this.handleSubmit}>submit</button>

                {/* <LinkButton
                    to='/explore'
                    onClick={this.handleSubmit}
                >
                    submit
                </LinkButton> */}

            </div>
        )
    }
}