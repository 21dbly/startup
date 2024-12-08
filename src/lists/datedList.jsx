import React from 'react';
import { NewTaskButton } from './newTaskButton';
import { Task } from './task';

export function DatedList({ userName }) {
    const [datedList, setDatedList] = React.useState([]);
    const [error, setError] = React.useState("");

    const today = new Date();
    //                                                                        I know this is not elegant. I'll fix it some day
    const today_YMD = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate() >= 10 ? today.getDate() : `0${today.getDate()}`}`;

    React.useEffect(() => {
        fetch(`/api/list/dated`)
            .then(async (response) => {
                try {
                    return await response.json();
                } catch (error) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
            })
            .then(async (response) => {
                if (!response.ok) {throw new Error(`${response.msg}`);}
                return response;
            })
            .then((list) => {setDatedList(list);})
            .catch((e) => {
                console.log(e.message);
                setError(e.message);
            });
    }, []);

    if (error) {
        return (<p>{error}</p>);
    }



    if (datedList.length === 0) {
        return <BlankList today={today_YMD} />;
    }

    const datedTable = [];
    let date = datedList[0]?.date;
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