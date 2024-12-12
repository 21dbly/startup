import React from 'react';
import './login.css';

export function Authenticated(props) {

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
      // will use cookies to pass in tokens
    })
      .catch(() => {
        // logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userToken');
        props.onLogout();
      })
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