import React from 'react';
import { NewTaskButton } from './newTaskButton';
import { Task } from './task';

export function UndatedList() {
    const [undatedList, setUndatedList] = React.useState([])

    // Demonstrates calling a service asynchronously so that
    // React can properly update state objects with the results.
    React.useEffect(() => {
        const undatedListJSON = localStorage.getItem('undatedList');
        if (undatedListJSON) {
            setUndatedList(JSON.parse(undatedListJSON));
        }
    }, []);

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