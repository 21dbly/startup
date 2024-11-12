import React from 'react';
import './login.css';

export function Authenticated(props) {

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <>
      <h2>Welcome!</h2>
      <div id="login-buttons">
        <button onClick={() => logout()}>Logout</button>
      </div>
    </>
  );
}