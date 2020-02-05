import React from 'react';
import axios from 'axios'
import './App.css';
import Navbar from './Components/Navbar'
import { Switch, Route, withRouter } from 'react-router-dom'
import AuthContainer from './Containers/AuthContainer'
import Home from './Components/Home'
import Users from './Components/Users'
import PrivateRoute from './Components/PrivateRoute'

class App extends React.Component {
  state = {
    user: null,
    isUserLoggedIn: false
  }

  setUser = (user) => {
    this.setState({
      user: user,
      isUserLoggedIn: true
    })
  }

  checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get('/auth/isUserLoggedIn')
      if (data.payload) {
        this.setUser(data.payload)
      } else {
        return
      }
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  componentDidMount() {
    this.checkUserLoggedIn()
  }

  logoutUser = async () => {
    try {
      await axios.get('/auth/logout')
      this.setState({
        user: null,
        isUserLoggedIn: false
      })
      this.props.history.push('/')
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  renderAuthContainer = (routeProps) => {
    console.log('auth')
    return (
      <AuthContainer setUser={this.setUser} isUserLoggedIn={this.state.isUserLoggedIn} {...routeProps}/>
    )
  }

  render() {
    return (
      <div className="App">
        <Navbar logoutUser={this.logoutUser} isUserLoggedIn={this.state.isUserLoggedIn}/>
        <Switch>
          <Route path='/login' render={this.renderAuthContainer}/>
          <Route path='/signup' render={this.renderAuthContainer}/>
          <PrivateRoute path='/users' component={Users} isUserLoggedIn={this.state.isUserLoggedIn}/>
          <Route path='/' component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
