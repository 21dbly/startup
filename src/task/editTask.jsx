import React, { useEffect, useState } from 'react';
import './task.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {ModalMessage} from '../modalMessage/modalMessage.jsx';

//default values
const TITLE = "Untitled";

export function EditTask({ userName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [displayError, setDisplayError] = useState(null);
  const id = location.state?.id;
  const start_list_type = location.state?.list;

  const [ogDate, setOgDate] = useState('');
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  // maybe local storage can help...
  React.useEffect(() => {
    fetch(`/api/task/${userName}/${start_list_type}/${id}`)
        .then((response) => {
          if (!response.ok) {
            //I'm not sure the best way to do error handling doing fetch this way
            // this is not working quite right
            // it still goes to the next then even if there's an error?
            setDisplayError(response.json().msg);
            return;
          }
            return response.json();
          })
        .then((task) => {
          setOgDate(task.date);
          setTitle(task.title);
          setDetails(task.details);
          setDate(task.date);
          setTime(task.time);
        })
  }, []);
  
  async function update() {
    const response = await fetch(`api/task/${userName}`, {
      method: 'put',
      body: JSON.stringify({ old_date: ogDate, task: {id: id, title: title, details: details, date: date, time: time} }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      navigate('/lists');
    } else {
      // for some reason this line isn't working with errors
      const body = await response.json();
      if (body.msg) {
        setDisplayError(`⚠ Error: ${body.msg}`);
      } else {
        setDisplayError(`${response.status} Error: ${response.statusText}`);
      }
    }
  }

  async function delete_task() {
    const response = await fetch(`api/task/${userName}/${start_list_type}/${id}`, {
      method: 'delete',
    });
    if (response?.status === 200) {
      navigate('/lists');
    } else {
      // this line probably needs some work too then
      const body = await response.json();
      if (body.msg) {
        setDisplayError(`⚠ Error: ${body.msg}`);
      } else {
        setDisplayError(`${response.status} Error: ${response.statusText}`);
      }
    }
  }

  function cancel() {
    navigate('/lists');
  }

  return (
    <main>
      <div id="box">
        <h2>Editing Task</h2>
        {/* <form id="task-form" method="get" action="/lists"> */}
          <div>
            <span>Task name: </span><input type="text" placeholder="Task" value={title}
            onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div>
            <span>Details: </span>
            <textarea placeholder="details about the task" value={details}
            onChange={(e) => setDetails(e.target.value)} />
          </div>
          <div>
            <span>Due Date: </span><input type="date" value={date}
            onChange={(e) => setDate(e.target.value)} />
            <span>Time: </span><input type="time" value={time}
            onChange={(e) => setTime(e.target.value)} />
          </div>
          {/* <div>Repeating? <input type="checkbox" /></div> */}
          <div>
            <button onClick={cancel}>Cancel</button>
            <button onClick={delete_task}>Delete</button>
            <button onClick={update}>Update</button>
          </div>
        {/* </form> */}
      </div>
      <ModalMessage message={displayError} show={displayError} onHide={() => setDisplayError(null)}/>
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