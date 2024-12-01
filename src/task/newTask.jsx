import React, { useEffect, useState } from 'react';
import './task.css';
import { v4 as uuid } from 'uuid';
import { useLocation } from 'react-router-dom';

//default values
const TITLE = "Untitled";

export function NewTask({ userName }) {
  const location = useLocation()
  const date_clicked = location.state?.date_clicked || "";

  const [title, setTitle] = useState(TITLE);
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(date_clicked);
  const [time, setTime] = useState("");

  async function submit() {
    const response = await fetch(`api/${userName}/task`, {
      method: 'post',
      body: JSON.stringify({ task: {id: uuid(), title: title, details: details, date: date, time: time}}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      // navigate to /lists
    } else {
      // error
    }
  }

  function cancel(/*navigate back*/) {}

  return (
    <main>
      <div id="box">
        <h2>New Task</h2>
        <form id="task-form" method="get" action="/lists">
          <div>
            <span>Task name: </span><input type="text" placeholder="Task"
            onChange={(e) => setTitle(e.target.value || TITLE)}/>
          </div>
          <div>
            <span>Details: </span>
            <textarea placeholder="details about the task" 
            onChange={(e) => setDetails(e.target.value || "")} />
          </div>
          <div>
            <span>Due Date: </span><input type="date" value={date}
            onChange={(e) => setDate(e.target.value || "")} />
            <span>Time: </span><input type="time" 
            onChange={(e) => setTime(e.target.value || "")} />
          </div>
          {/* <div>Repeating? <input type="checkbox" /></div> */}
          <div>
            <button onClick={cancel}>Cancel</button>
            <button onClick={submit}>Create</button>
          </div>
        </form>
      </div>
    </main>
  );
}

function insert_in_order(list, task) {
  for (let i in list) {
    let t = list[i];
    if ((t.date === task.date && t.time > task.time) || t.date > task.date) {
      list.splice(i, 0, task);
      return;
    }
  }
  list.push(task);
}