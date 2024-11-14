import React from 'react';
import './lists.css'
import { DatedList } from './datedList.jsx';
import { UndatedList } from './undatedList.jsx';


export function Lists() {

  return (
    <main id="lists-main">
        <DatedList />
        
        <UndatedList />
    </main>
  );
}