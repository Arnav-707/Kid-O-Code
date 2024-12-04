import React, { useState } from "react";
import './login.css';
import {login} from '../Auth/login'
import { isAuthenticated } from "../Auth/auth_present";
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    if(!isAuthenticated()){
    return (
        <div id ="main">
            <div id="naam">
                <h1>Login Form</h1>
                <form>
                    <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /><br />
                    <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required /><br />
                    <input className="btn" type="button" value="Login" onClick={()=>login(email,password)}  />
                    <input className="btn" type="reset" value="Reset" />
                    {/* <p>Forgot <a href="#">Password</a> or <a href="#">Username</a></p> */}

                </form>
            </div>
        </div>
        );
    }
    else{
        window.location.href='/homepage';
    }
}

export default LoginForm;