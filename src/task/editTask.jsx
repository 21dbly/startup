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
    fetch(`/api/${userName}/${start_list_type}/${id}`)
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
    const response = await fetch(`api/${userName}/task`, {
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

  //   const new_list_type = date ? "datedList" : "undatedList";
  //   const old_list = JSON.parse(localStorage.getItem(start_list_type)) || [];

  //   if (date === og_date) {
  //     const task_index = old_list.findIndex((t) => (t.id === id));
  //     if (task_index < 0) {
  //       console.log("the task you're looking for disappeared");
  //       return(<p>will this error show? idk but the task you're looking for disappeared</p>);
  //     }
  //     old_list[task_index] = {id: id, title: title || TITLE, details: details, date: date, time: time};
  //     localStorage.setItem(start_list_type, JSON.stringify(old_list));

  //   } else {
  //     let new_list = JSON.parse(localStorage.getItem(new_list_type)) || [];
  //     const old_index = old_list.findIndex((t) => (t.id === id));
  //     if (old_index >= 0) {
  //       old_list.splice(old_index, 1);
  //     }
  //     if (new_list_type === start_list_type) new_list = old_list;
  //     if (date) {
  //       insert_in_order(new_list, {id: id, title: title || TITLE, details: details, date: date, time: time});
  //     } else {
  //       new_list.push({id: id, title: title || TITLE, details: details})
  //     }
  //     localStorage.setItem(start_list_type, JSON.stringify(old_list));
  //     localStorage.setItem(new_list_type, JSON.stringify(new_list));
  //   }

  //   navigate('/lists');
  }

  function delete_task() {
    const old_list = JSON.parse(localStorage.getItem(start_list_type)) || [];
    const old_index = old_list.findIndex((t) => (t.id === id));
    if (old_index >= 0) {
      old_list.splice(old_index, 1);
    }
    localStorage.setItem(start_list_type, JSON.stringify(old_list));
    
    navigate('/lists');
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