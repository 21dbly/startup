import React from 'react';
import './login.css';
import {Unauthenticated} from './unauthenticated.jsx';
import {Authenticated} from './authenticated.jsx';

export function Login(props) {
  const [imageUrl, setImageUrl] = React.useState('');

  React.useEffect(() => {
    setImageUrl('https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg');
  }, [])

  // console.log(props.isAuthorized)
  return (
    <main>
      { props.isAuthorized ? <Authenticated onLogout={() => props.onAuthChange('', false)}/> : <Unauthenticated onLogin={(userName) => props.onAuthChange(userName, true)}/>}

      <img src={imageUrl} alt='random landscape image' width="250" />
    </main>
  );
}