import React, { Component } from 'react';
import CreateAccountForm from './CreateAccountForm';

export default class CreateAccountPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <Section className='RegistrationPage'>
        <h2>Register</h2>
        <CreateAccountForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </Section>
    )
  }
}
