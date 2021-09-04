import React from 'react';
import AuthApiService from '../../Api-Service';
import TokenService from '../../token-service';
import { Button, Input } from '../Utils/Utils';

export default class LoginForm extends React.Component {

    static defaultProps = {
        onLoginSuccess: () => { }
    }

    state = {
        error: null,
        loggedIn: false
    }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { username, password } = ev.target

        AuthApiService.postLogin({
            username: username.value,
            password: password.value,
        })
            .then(res => {
                username.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.setState({ loggedIn: true })
                setTimeout(() => {
                    this.props.onLoginSuccess()
                }, 2000);
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitJwtAuth}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div>
                    {this.state.loggedIn ? (
                        <div className='successMessage'>Success! Redirecting...</div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className='username'>
                    <label htmlFor='LoginForm__username'>
                        User name
                    </label>
                    <Input
                        name='username'
                        required
                        id='LoginForm__username'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='LoginForm__password'>
                        Password
                    </label>
                    <Input
                        name='password'
                        type='password'
                        required
                        id='LoginForm__password'>
                    </Input>
                </div>
                <Button type='submit'>
                    Login
                </Button>
            </form>
        )
    }
}