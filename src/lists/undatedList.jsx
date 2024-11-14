import React from 'react';

export function UndatedList() {
    const [undatedList, setDatedList] = React.useState([])

    // Demonstrates calling a service asynchronously so that
    // React can properly update state objects with the results.
    React.useEffect(() => {
        const undatedListJSON = localStorage.getItem('undatedList');
        if (undatedListJSON) {
            setDatedList(JSON.parse(undatedListJSON));
        }
        setDatedList([{title:'Do something', details:'just do it', key:'1'},
            {title:'Make a video game', details:"fantasy 2d storybased somewhat systematic roguelike", key:'2'}
        ]);
    }, []);

    if (undatedList.length === 0) {
        return <BlankList />;
    }

    const undatedTable = [];
    for (let task of undatedList) {
        undatedTable.push(
            <li key={task.key}>
                <span className='task-title'>{task.title}</span>{"-"}
                <span className='task-details'>{task.details}</span>{"-"}
            </li>
        );
    }

    return (
        <section id="today" className="list">
            <h2 className="can-add" key="0">
                Today
                <form action="/newtask" className="add-button"><button type="submit">+</button></form>
                {/* change form to onClick and make it its own component*/}
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
            <form action="/newtask" className="add-button"><button type="submit">+</button></form>
            {/* change form to onClick and make button its own component*/}
        </h2>
        <p>Nothing to do, add a new task!</p>
    </section>
    );
}

{/* <section id="todo" className="list">
        <h2 className="can-add">
            To Do
            <form action="/newtask" className="add-button"><button type="submit">+</button></form>
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
    </section> */}