import React from 'react';
import './app.css';

export default function App() {
    return (
        <div className='body'>
            <header>
            <h1>To Due</h1>
            <a className="menu" href="login.html">Back to Login</a>
            <a className="menu" href="newtask.html">New Task</a>
            <p className="menu" id="user">User: Iejfoiwjoif</p>
            <a className="small-menu" href="login.html"> Login </a>
            <a className="small-menu" href="newtask.html"> New </a>
            <p className="small-menu"> Iejfoiwjoif </p>
            </header>

            <main>App components here</main>

            <footer>
                <span>Made by Donovan Bly</span>
                <a href="https://github.com/21dbly/startup/tree/main">GitHub</a>
            </footer>
        </div>
    )
}