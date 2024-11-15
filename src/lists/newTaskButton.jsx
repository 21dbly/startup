import React from 'react';
import { useNavigate } from 'react-router-dom';

export function NewTaskButton( {date} ) {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/newtask', { state: {date_clicked: date }});
        // console.log(date);
    }

    return (
        <button className="add-button" onClick={handleClick}>
            +
        </button>
    );
}