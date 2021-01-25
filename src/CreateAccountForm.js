import React from 'react';
import ApiContext from "./ApiContext";
import LinkButton from './LinkButton';
import { newUser } from './ApiService';
import { Link } from 'react-router-dom';

const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: ""
};

export default class CreateAccountForm extends React.Component {
    static contextType = ApiContext;

    state = initialState;

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    validate = () => {
        let usernameError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;

        if (!this.state.username) {
            usernameError = "username cannot be blank";
        }

        if (!this.state.password) {
            passwordError = "password cannot be blank";
        }

        if (!this.state.confirmPassword) {
            confirmPasswordError = "confirm password required";
        }

        if (this.state.password && this.state.confirmPassword && password !== confirmPassword) {
            passwordError = "passwords must match";
            confirmPasswordError = "passwords must match";
        }

        if (usernameError || passwordError || confirmPasswordError) {
            return this.setState({ usernameError, passwordError, confirmPasswordError });
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();

        const username = this.state.username;
        const password = this.state.password;
        const isValid = this.validate();
        const addUser = this.context.addUser;

        if (!isValid) {
            return false;
        }

        if (isValid) {
            console.log(this.state);

            this.setState(initialState);
        }

        newUser(username, password, addUser);
    };




    render() {
        return (
            <div>
                <form className="inputField" onSubmit={this.handleSubmit}>

                    <input
                        name="username"
                        placeholder="select username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />

                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.usernameError}
                    </div>

                    <input
                        type="password"
                        name="password"
                        placeholder="select password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.passwordError}
                    </div>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                    />

                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.confirmPasswordError}
                    </div>

                    <LinkButton
                        to='/explore'
                        onClick={this.handleSubmit}
                    >
                        submit
                    </LinkButton>

                    {/* <button onClick={this.handleSubmit}>submit</button> */}
                </form>
            </div>
        );
    }
}