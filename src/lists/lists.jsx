import React from 'react';
import './lists.css'
import { DatedList } from './datedList.jsx';
import { UndatedList } from './undatedList.jsx';
import { ListUpdaterClass } from './updateLists.jsx';

export function Lists({ userName }) {
  const [ListUpdater, setListUpdater] = React.useState(null);
  const [update, setUpdate] = React.useState("");
  const [timeoutId, setTimeoutId] = React.useState(0);
  const [undatedList, setUndatedList] = React.useState([]);
  const [undatedError, setUndatedError] = React.useState("");
  const [datedList, setDatedList] = React.useState([]);
  const [datedError, setDatedError] = React.useState("");

  React.useEffect(() => {
    getLists()
    const lu = new ListUpdaterClass(localStorage.getItem("userToken"));
    lu.setHandler(receiveMessage);
    setListUpdater(lu);
    return () => {lu.socket.close()};
  }, []);

  async function getLists() {
    setDatedError("");
    setUndatedError("");

    // since we're only using loginToken cookies to get lists, you can only be logged in to 1 user at a time in 1 browser
    // I wonder if that's possible to fix or if most websites have that requirement?
    // when this happens, the displayed username can get temporarily out of sync with the actual user logged in
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

  function receiveMessage(msg) {
    // I could make this check more organized and scalable
    if (msg === "task edited" || msg === "task created" || msg === "task deleted") {
      updateLists();
    } else {
      clearTimeout(timeoutId);
      setUpdate(`websocket - ${msg}`);
      const newId = setTimeout(() => {setUpdate("");}, 2000);
      setTimeoutId(newId);
    }
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
      {/* <button onClick={updateLists}>click for update</button> */}
    </main>
  );
}

async function handleFetchError(response) {
  // takes in fetch response
  // throws error with correct message if not valid
  // returns jsonified response if valid
  if (!response.ok) {
    let jsonified;
    try {
      jsonified = await response.json();
    } catch (error) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    throw new Error(`${jsonified.msg}`);
  }
  return response;
}