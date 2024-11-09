import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Lists } from './lists/lists';
import { Newtask } from './newtask/newtask';

export default function App() {
    const [authState, setAuthState] = React.useState();
    const [userName, setUserName] = React.useState();

    return (
        <BrowserRouter>
            <div className='body'>
                <header>
                    <h1>DoDue</h1>
                    <NavLink className="menu" to="">Back to Login</NavLink>
                    <NavLink className="menu" to="lists">List View</NavLink>
                    <NavLink className="menu" to="newtask">New Task</NavLink>
                    <p className="menu" id="user">User: Iejfoiwjoif</p>
                    {/* <a className="small-menu" href="login.html"> Login </a>
                    <a className="small-menu" href="newtask.html"> New </a>
                    <p className="small-menu"> Iejfoiwjoif </p> */}
                </header>

                <Routes>
                    <Route path='/' element={<Login 
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);
                        }}/>} exact />
                    <Route path='/lists' element={<Lists />} />
                    <Route path='/newtask' element={<Newtask />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <span>Made by Donovan Bly</span>
                    <a href="https://github.com/21dbly/startup/tree/main">GitHub</a>
                </footer>
            </div>
        </BrowserRouter>
    )
}

function NotFound() {
    return <main>404: Return to sender. Address unknown.</main>
}