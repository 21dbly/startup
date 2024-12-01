import React from 'react';
import './lists.css'
import { DatedList } from './datedList.jsx';
import { UndatedList } from './undatedList.jsx';


export function Lists({ userName }) {

  return (
    <main id="lists-main">
        <DatedList userName={userName}/>
        
        <UndatedList userName={userName}/>
    </main>
  );
}