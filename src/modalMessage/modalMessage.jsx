import React from 'react';
import './modalMessage.css';

export function ModalMessage(props) {
    return (
        <div id="modal" className={props.show ? "show" : "hide"}>
            <div id="modal-content">
                <h1>{props.title}</h1>
                <p>{props.message}</p>
                <button onClick={props.onHide}>Close</button>
            </div>
        </div>
    );
}