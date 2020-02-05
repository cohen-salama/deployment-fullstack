import React, { Component } from "react";
import axios from 'axios';

class Users extends Component {
  constructor() {
    super()

    this.state = {
      users: []
    }
  }

  async componentDidMount() {
    try {
      let { data } = await axios.get('/api/users')
      this.setState({ users: data.payload })
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  render() {
    return (
      <div>
        <h2>Users</h2>
        <ul>
        {this.state.users.map((user, i) => {
          return (
            <li className="user-item" key={i}>
              <p><span>id: </span>{user.id}</p>
              <p><span>user: </span>{user.username}</p>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}

export default Users;
