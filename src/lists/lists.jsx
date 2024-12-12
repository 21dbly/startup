import React from 'react';
import './lists.css'
import { DatedList } from './datedList.jsx';
import { UndatedList } from './undatedList.jsx';
import { ListUpdaterClass } from './updateLists.jsx';

export function Lists({ userName }) {
  const ListUpdater = new ListUpdaterClass(localStorage.getItem("userToken"));
  const [update, setUpdate] = React.useState("");
  const [timeoutId, setTimeoutId] = React.useState(0);
  const [undatedList, setUndatedList] = React.useState([]);
  const [undatedError, setUndatedError] = React.useState("");
  const [datedList, setDatedList] = React.useState([]);
  const [datedError, setDatedError] = React.useState("");

  React.useEffect(() => {getLists()}, []);

  async function getLists() {
    setDatedError("");
    setUndatedError("");

    await fetch(`/api/list/undated`)
      .then(handleFetchError)
      .then((r) => (r.json()))
      .then((list) => {setUndatedList(list);})
      .catch((e) => {
          console.log(e.message);
          setUndatedError(e.message);
      });

    await fetch(`/api/list/dated`)
      .then(handleFetchError)
      .then((r) => (r.json()))
      .then((list) => {setDatedList(list);})
      .catch((e) => {
          console.log(e.message);
          setDatedError(e.message);
      });
  }

  async function updateLists() {
    clearTimeout(timeoutId);
    setUpdate(`updating...`);

    await getLists();

    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    setUpdate(`updated just now - ${time}`);
    const newId = setTimeout(() => {setUpdate("");}, 5000);
    setTimeoutId(newId);
  }

  return (
    <main id="lists-main">
      <p id="update" className={update ? "show" : "hide"}>{update}</p>

      <DatedList datedList={datedList} error={datedError}/>
      
      <UndatedList undatedList={undatedList} error={undatedError}/>
      <button onClick={updateLists}>click for update</button>
    </main>
  );
}

async function handleFetchError(response) {
  // takes in fetch response
  // throws error with correct message if not valid
  // returns jsonified response if valid
  if (!response.ok) {
    try {
      await response.json();
    } catch (error) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    throw new Error(`${response.msg}`);
  }
  return response;
}

async function createListUpdater() {
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {'Content-type': 'application/json; charset=UTF-8'}
  });
  if (response?.status === 200) {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  } else {
    const body = await response.json();
    if (body.msg) {
      setDisplayError(`⚠ Error: ${body.msg}`);
    } else {
      setDisplayError(`${response.status} Error: ${response.statusText}`);
    }
  }
}