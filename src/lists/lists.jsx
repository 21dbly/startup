import React from 'react';
import './lists.css'

// lists is somehow getting some css from newtask.css
// specifically main {flex-direction: column} is the problem
export function Lists() {
  return (
    <main>
        <section id="today" className="list">
            <h2 className="can-add">
              Today
              <form action="newtask.html" className="add-button"><button type="submit">+</button></form>
            </h2>
            <h3 className="can-add">
              Mon, May 20
              <form action="newtask.html" className="add-button"><button type="submit">+</button></form>
            </h3>
            <ul>
                <li>task one</li>
                <li>task two <span>12:00pm</span></li>
                <li>task due! <span>11:59pm</span></li>
            </ul>
            <h3 className="can-add">
              Tues, May 21
              <form action="newtask.html" className="add-button"><button type="submit">+</button></form>
            </h3>
            <ul>
                <li>task goes here <span>(time in span)</span></li>
                <li>some tasks have no time <span></span></li>
                <li>click on task to see more details <span></span></li>
            </ul>
        </section>
        
        <section id="todo" className="list">
            <h2 className="can-add">
              To Do
              <form action="newtask.html" className="add-button"><button type="submit">+</button></form>
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