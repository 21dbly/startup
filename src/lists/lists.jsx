import React from 'react';
import './lists.css'
import {DatedList} from './datedList.jsx';


export function Lists() {

  return (
    <main id="lists-main">
        <DatedList />
        
        <section id="todo" className="list">
            <h2 className="can-add">
              To Do
              <form action="/newtask" className="add-button"><button type="submit">+</button></form>
            </h2>
            <ul>
                <li>just a list</li>
                <li>a list of things to do</li>
                <li>eventually</li>
                <li>do laundry</li>
                <li>go to sleep</li>
                <li>things like that</li>
                <li>by the way these lists will be stored in a database</li>
                <li>and they'll be updated in real time from different devices using websockets</li>
            </ul>
        </section>
    </main>
  );
}