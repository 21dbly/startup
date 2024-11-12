import React from 'react';
import './login.css';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('')

  async function loginUser() {
    localStorage.getItem('userName', userName);
    props.onLogin(userName, true);
    // this is obviously a work in progress
  }

  async function createUser() {
    localStorage.setItem('userName', userName)
    props.onLogin(userName, true);
  }

  return (
    <>
      <h2>Login</h2>
      <div>
        <span>@</span>
        <input type="email" placeholder="your@email.com"
          value={userName} onChange={(e) => setUserName(e.target.value)}/>
      </div>
      <div>
        <span>🔒</span>
        <input type="password" placeholder="password" 
          onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div id="login-buttons">
        <button onClick={() => loginUser()}>Login</button>
        <button onClick={() => createUser()}>Create</button>
      </div>
    </>
  );
}