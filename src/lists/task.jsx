import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Task( {task} ) {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/editTask", {state: {id: task.id, list: task.date ? "dated" : "undated"}});
    }

    return (
        <li className='task' onClick={handleClick}>
            <span className='task-title'>{task.title || "Untitled"}</span>
            {" - "}<span className='task-details'>{task.details || ""}</span>
            {!task.date || (<>
                {" - "}<span className='task-time'>{task.time || ""}</span>
            </>)}
        </li>
    );
}