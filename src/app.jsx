import React, { useEffect } from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Lists } from './lists/lists';
import { NewTask } from './task/newTask';
import {EditTask} from './task/editTask';
// import { useNavigate } from 'react-router-dom';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const [isAuthorized, setIsAuthorized] = React.useState(false);
    if (userName && !isAuthorized) setIsAuthorized(true);
    // const navigate = useNavigate();
    // I want to make it so it redirects to login if ever someone is not logged in.

    function LoginWithAuthInfo() {
        return(
        <Login 
            userName={userName}
            isAuthorized={isAuthorized}
            onAuthChange={(userName, new_auth) => {
                setIsAuthorized(new_auth);
                setUserName(userName);
            }}/>)
    }

    return (
        <BrowserRouter>
            <div className='body'>
                <header>
                    <h1>DoDue</h1>
                    <p>{isAuthorized ? "authorized" : "not"}</p>
                    <NavLink className="menu" to="">Back to Login</NavLink>
                    {isAuthorized &&
                        (<><NavLink className="menu" to="lists">List View</NavLink>
                        <NavLink className="menu" to="newTask">New Task</NavLink>
                        <p className="menu" id="user">User: {userName}</p></>) }

                    {/* <a className="small-menu" href="login.html"> Login </a>
                    <a className="small-menu" href="newtask.html"> New </a>
                    <p className="small-menu"> Iejfoiwjoif </p> */}
                </header>

                <Routes>
                    <Route path='/' element={LoginWithAuthInfo()} exact />

                    <Route path='/lists' element={<Lists userName={userName}/>} />

                    <Route path='/newTask' element={<NewTask userName={userName}/>} />

                    <Route path='/editTask' element={<EditTask />} />
                    
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