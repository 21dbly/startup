import React from 'react';
import { NewTaskButton } from './newTaskButton';
import { Task } from './task';

export function UndatedList({ undatedList, error }) {
    // const [undatedList, setUndatedList] = React.useState([]);
    // const [error, setError] = React.useState("");

    // React.useEffect(() => {
    //     fetch(`/api/list/undated`)
    //         .then(handleFetchError)
    //         .then((r) => (r.json()))
    //         .then((list) => {setUndatedList(list);})
    //         .catch((e) => {
    //             console.log(e.message);
    //             setError(e.message);
    //         });
    // }, []);
    
    if (error) {
        return (<p>{error}</p>);
    }

    if (undatedList.length === 0) {
        return <BlankList />;
    }

    const undatedTable = [];
    for (let task of undatedList) {
        undatedTable.push(
            <Task task={task} key={task.id}/>
        );
    }

    return (
        <section id="todo" className="list">
            <h2 className="can-add" key="0">
                To Do
                <NewTaskButton />
            </h2>
            {undatedTable}
        </section>
    );

}

function BlankList() {
    return (
    <section id="todo" className="list">
        <h2 className="can-add">
            To Do
            <NewTaskButton />
        </h2>
        <p>Nothing to do, add a new task!</p>
    </section>
    );
}

// async function handleFetchError(response) {
//     // takes in fetch response
//     // throws error with correct message if not valid
//     // returns jsonified response if valid
//     if (!response.ok) {
//       try {
//         await response.json();
//       } catch (error) {
//         throw new Error(`${response.status}: ${response.statusText}`);
//       }
//       throw new Error(`${response.msg}`);
//     }
//     return response;
//   }