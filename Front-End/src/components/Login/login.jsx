import React, { useState } from "react";
import './login.css';
import {login} from '../Auth/login'
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    return (
        <div id ="main">
            <div id="naam">
                <h1>Login Form</h1>
                <form>
                    <input value={email} type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /><br />
                    <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required /><br />
                    <input className="login_btn" type="button" value="Login" onClick={()=>login(email,password)}  />
                    {/* <input className="btn" type="reset" value="Reset" /> */}
                    <p className="login_p">Forgot <a href="#">Password</a> or <a href="/signup">New User</a></p>

                </form>
            </div>
        </div>
        );
    }
export default LoginForm;