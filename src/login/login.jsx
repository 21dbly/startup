import React from 'react';
import './login.css';
import {Unauthenticated} from './unauthenticated.jsx';
import {Authenticated} from './authenticated.jsx';


export function Login(props) {
  const [imageUrl, setImageUrl] = React.useState('');

  React.useEffect(() => {
    const random = Math.floor(Math.random() * 900);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const imageContainer = document.querySelector('#picture');
        const width = imageContainer.offsetWidth;
        const height = imageContainer.offsetHeight;
        setImageUrl(`https://picsum.photos/id/${data[0].id}/${width}/${height}`);
      })
      .catch();
  }, []);

  return (
    <main>
      { props.isAuthorized ? <Authenticated onLogout={() => props.onAuthChange('', false)}/> : <Unauthenticated onLogin={(userName) => props.onAuthChange(userName, true)}/>}

      {/* I can't get the image proportions how I want, but at least the service is working.
      I'll have to mess with css more at some point */}
      <img id='picture' src={imageUrl} alt='random landscape image' width='800' height='400'/>
    </main>
  );
}