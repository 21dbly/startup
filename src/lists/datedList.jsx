import React from 'react';
import { NewTaskButton } from './newTaskButton';
import { Task } from './task';

export function DatedList() {
    const [datedList, setDatedList] = React.useState([])

    const today = new Date();
    const today_YMD = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    // Demonstrates calling a service asynchronously so that
    // React can properly update state objects with the results.
    React.useEffect(() => {
        const datedListJSON = localStorage.getItem('datedList');
        if (datedListJSON) {
            setDatedList(JSON.parse(datedListJSON));
        }
        // setDatedList([{date:'11/12/2024', title:'Do Dishes', details:'just do them', time:'10:00pm', key:'dishes'},
        //     {date:'11/12/2024', title:'Do dishes again', time:"5:00pm", key:'3'},
        //     {date:'11/13/2024', title:'Do dishes again', time:"5:00pm", key:'2'},
        //     {date:'11/13/2024', title:'Do dishes again', time:"5:00pm", key:'4'}
        // ]);
    }, []);

    if (datedList.length === 0) {
        return <BlankList today={today_YMD} />;
    }

    const datedTable = [];
    let date = datedList[0].date;
    let singleDateList = [];
    for (let task of datedList) {
        if (date !== task.date) {
            datedTable.push(<SingleDateList key={date} date={date} list={singleDateList}/>);
            date = task.date;
            singleDateList = [];
        }
        singleDateList.push(task);
    }
    datedTable.push(<SingleDateList key={date} date={date} list={singleDateList}/>);

    return (
        <section id="today" className="list">
            <h2 className="can-add" key="0">
                Today
                <NewTaskButton date={today_YMD} />
                {/* <form action="/newtask" className="add-button"><button type="submit">+</button></form> */}
                {/* change form to onClick and make button its own component*/}
            </h2>
            {datedTable}
        </section>
    );

}

function BlankList( {today} ) {
    return (
    <section id="today" className="list">
        <h2 className="can-add">
            Today
            <NewTaskButton date={today} />
            {/* <form action="/newtask" className="add-button"><button type="submit">+</button></form> */}
            {/* change form to onClick and make it its own component*/}
        </h2>
        <p>Nothing to do, add a new task!</p>
    </section>
    );
}

function SingleDateList({ date, list}) {
    return (
    <div>
    <h3 className="can-add">
        {date}
        <NewTaskButton date={date} />
        {/* <form action="/newtask" className="add-button"><button type="submit">+</button></form> */}
    </h3>
    <ul>
        {list.map((item, index) => (
            <Task task={item} key={item.id}/>
            // <li key={item.id}>
            //     <span className='task-title'>{item.title}</span>{" - "}
            //     <span className='task-details'>{item.details}</span>{" - "}
            //     <span className='task-time'>{item.time}</span>
            // </li>
        ))}
    </ul>
    </div>
    );
}

{/* <section id="today" className="list">
    <h2 className="can-add">
        Today
        <form action="/newtask" className="add-button"><button type="submit">+</button></form>
    </h2>
    <h3 className="can-add">
        Mon, May 20
        <form action="/newtask" className="add-button"><button type="submit">+</button></form>
    </h3>
    <ul>
        <li>task one</li>
        <li>task two <span>12:00pm</span></li>
        <li>task due! <span>11:59pm</span></li>
    </ul>
    <h3 className="can-add">
        Tues, May 21
        <form action="/newtask" className="add-button"><button type="submit">+</button></form>
    </h3>
    <ul>
        <li>task goes here <span>(time in span)</span></li>
        <li>some tasks have no time <span></span></li>
        <li>click on task to see more details <span></span></li>
    </ul>
</section> */}