import React from 'react';
import './login.css';

export function Login() {
  const [imageUrl, setImageUrl] = React.useState('');

  React.useEffect(() => {
    setImageUrl('https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg');
  }, [])

  return (
    <main>
      <h2>Login</h2>
      <form id="login-form" method="get" action="lists">
        <div>
          <span>@</span>
          <input type="email" placeholder="your@email.com" />
        </div>
        <div>
          <span>🔒</span>
          <input type="password" placeholder="password" />
        </div>
        <div id="login-buttons">
          <button type="submit">Login</button>
          <button type="submit">Create</button>
        </div>
      </form>

      <img src={imageUrl} alt='random landscape image' width="250" />
    </main>
  );
}