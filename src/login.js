import React from 'react';
import ApiContext from "./ApiContext";
import config from "./config";

const initialState = {
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    fullnameError: "",
    usernameError: "",
    passwordError: "",
    confirmPasswordError: ""
};

export default class Login extends React.Component {

    static contextType = ApiContext;

    state = initialState;

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    validate = () => {
        let fullnameError = "";
        let usernameError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;

        if (!this.state.fullname) {
            fullnameError = "name cannot be blank";
        }

        if (!this.state.username) {
            usernameError = "username cannot be blank";
        }

        if (!this.state.password) {
            passwordError = "password cannot be blank";
        }

        if (!this.state.confirmPassword) {
            confirmPasswordError = "confirm password required";
        }

        if (!this.state.confirmPassword) {
            confirmPasswordError = "confirm password required";
        }

        if (this.state.password && this.state.confirmPassword && password !== confirmPassword) {
            passwordError = "passwords must match";
            confirmPasswordError = "passwords must match";
        }

        if (fullnameError || usernameError || passwordError || confirmPasswordError) {
            return this.setState({ fullnameError, usernameError, passwordError, confirmPasswordError });
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();

        const fullname = this.state.fullname;
        const username = this.state.username;
        const password = this.state.password;

        const isValid = this.validate();

        if (!isValid) {
            return false;
        }

        if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);
        }

        fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                fullname: fullname,
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.context.addUser(data)
                //this.props.history.push('/')
            })
            .catch(error => console.log(error))

    };




    render() {
        return (
            <div>
                <form className="inputField" onSubmit={this.handleSubmit}>

                    <input
                        name="fullname"
                        placeholder="full name"
                        value={this.state.fullname}
                        onChange={this.handleChange}
                    />

                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.fullnameError}
                    </div>

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

                    <button onClick={this.handleSubmit}>submit</button>
                </form>
            </div>
        );
    }
}