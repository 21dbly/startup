import React, { useEffect, useState } from 'react';
import './task.css';
import { v4 as uuid } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListUpdaterClass } from '../lists/updateLists';

//default values
const TITLE = "Untitled";

export function NewTask({ userName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const date_clicked = location.state?.date_clicked || "";

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(date_clicked);
  const [time, setTime] = useState("");

  const [ListUpdater, setListUpdater] = React.useState(null);

  // sets up a new websocket connection each time you edit or make a task.
  // Definitly not the best way to do this but it's what we've got for not
  React.useEffect(() => {
    const lu = new ListUpdaterClass(localStorage.getItem("userToken"));
    setListUpdater(lu);
    return () => {lu.socket.close()};
  }, []);

  async function submit() {
    const response = await fetch(`api/task`, {
      method: 'post',
      body: JSON.stringify({ task: {id: uuid(), title: (title||TITLE), details: details, date: date, time: time}}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    

    if (response?.status === 200) {
      if (ListUpdater) {
        ListUpdater.sendEvent("task created");
      }
      navigate('/lists');
    } else {
      // error
    }
  }

  function cancel() {
    navigate('/lists');
  }

  return (
    <main>
      <div id="box">
        <h2>New Task</h2>
          <div>
            <span>Task name: </span><input type="text" placeholder="Task"
            onChange={(e) => setTitle(e.target.value || "")}/>
          </div>
          <div>
            <span>Details: </span>
            <textarea placeholder="details about the task" 
            onChange={(e) => setDetails(e.target.value || "")} />
          </div>
          <div>
            {/* default date value is not showing up */}
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
      </div>
    </main>
  );
}