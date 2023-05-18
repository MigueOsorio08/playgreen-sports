import React, { useState } from 'react';
import loginWithEmailAndPassword from '../functions/login';
import registerUser from '../functions/registerUser';
import '../style/login.css';
// import loginGoogle from '../functions/loginGoogle';

function Login() {
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    async function submitHandler(e: any) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        if (isLoggingIn) {
            await loginWithEmailAndPassword(username, password);
        } else {
            await registerUser(username, password);
        }
    }

    return (
        <section className='form-container'>
            <h1 className='title'>Welcome</h1>
            <h2 className='form-title'>{isLoggingIn ? "Login" : "Sign up"}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <form className="form flex" onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="username">User</label>
                    <input type="email" id="username" required placeholder='email'/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name='password' required minLength={6} maxLength={16} placeholder="Password"/>
                </div>
                <button className="change" onClick={() => setIsLoggingIn(!isLoggingIn)}>{isLoggingIn ? "Don't have a account? Register" : "Already registered? Login"}</button>
                <button className='submit' type="submit" id="login">{isLoggingIn ? "Login" : "Sign up"}</button>
            </form>
        </section>
    );
}

export default Login;