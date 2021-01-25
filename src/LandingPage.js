import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LinkButton from './LinkButton';

export default class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <LinkButton to='/create-account'>Create Account</LinkButton>
                <LinkButton to='/login'>Login</LinkButton>
            </div>
        )
    }
}