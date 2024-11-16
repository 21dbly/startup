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
    </h3>
    <ul>
        {list.map((item, index) => (
            <Task task={item} key={item.id}/>
        ))}
    </ul>
    </div>
    );
}