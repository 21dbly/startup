import React from 'react';
import './login.css';
import {ModalMessage} from '../modalMessage/modalMessage.jsx'; // is it bad to go to a different folder like this?

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate('/api/auth/login');
  }

  async function createUser() {
    loginOrCreate('/api/auth/create');
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      if (body.msg) {
        setDisplayError(`⚠ Error: ${body.msg}`);
      } else {
        setDisplayError(`${response.status} Error: ${response.statusText}`);
      }
    }
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
        <button onClick={() => loginUser()} disabled={!userName || !password}>Login</button>
        <button onClick={() => createUser()} disabled={!userName || !password}>Create</button>
      </div>

      <ModalMessage message={displayError} show={displayError} onHide={() => setDisplayError(null)}/>
    </>
  );
}