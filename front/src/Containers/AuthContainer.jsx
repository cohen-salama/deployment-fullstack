import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginForm from '../Components/LoginForm'
import SignupForm from '../Components/SignupForm.jsx'
import axios from 'axios'

class AuthContainer extends React.Component {
  state = {
    username:'',
    password_digest:'',
  }

  handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    this.setState({
      [inputName]: inputValue
    })
  }

  signupUser = async () => {
    try {
      await axios.post('/auth/signup', this.state)
      this.logInUser()
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  loginUser = async () => {
    try {
      const { data } = await axios.post('/auth/login', this.state)
      this.props.setUser(data.payload)
      this.props.history.push('/users')
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  renderLoginForm = () => {
    const { username, password } = this.state
    return <LoginForm
            handleChange={this.handleChange}
            username={username}
            password={password}
            loginUser={this.loginUser}
          />
  }

  renderSignupForm = () => {
    const { username, password } = this.state
    return <SignupForm
            handleChange={this.handleChange}
            username={username}
            password={password}
            signupUser={this.signupUser}
          />
  }

  render() {
    if (!this.props.isUserLoggedIn) {
      return (
        <div>
          <h2>AuthContainer</h2>
          <Switch>
            <Route path='/login' render={this.renderLoginForm} />
            <Route path='/signup' render={this.renderSignupForm}/>
          </Switch>
        </div>
      )
    } else {
      return (
        <Redirect to='/' />
      )
    }
  }
}

export default AuthContainer
