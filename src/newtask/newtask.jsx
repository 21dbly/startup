import React from 'react';
import './newtask.css';

export function Newtask() {
  return (
    <main>
      <div id="box">
        <h2>New Task</h2>
        <form id="task-form" method="get" action="lists">
          <div>
            <span>Task name: </span><input type="text" placeholder="Task" />
          </div>
          <div>
            <span>Details: </span>
            <textarea placeholder="details about the task"></textarea>
          </div>
          <div>
            <span>Due Date: </span><input type="datetime" />
          </div>
          {/* <div>Repeating? <input type="checkbox" /></div> */}
          <button type="submit">Create</button>
        </form>
      </div>
    </main>
  );
}