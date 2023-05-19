import React, { useState } from 'react';
import loginWithEmailAndPassword from '../functions/login';
import registerUser from '../functions/registerUser';
// import '../style/login.css';
import styled from 'styled-components';
// import loginGoogle from '../functions/loginGoogle';

const FormContainer = styled.section`
background-color: #181828;
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
flex-direction: column;
color: white;

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

.title {
    font-size:42px;
    font-weight: bold;
}

.form-title {
    margin-bottom:1rem;
}

p{
    width: 70%;
    margin-bottom: 1rem;
    text-align: justify;
    font-weight: 400;
    font-size: 18px;
    line-height: 148.02%;
    opacity: 0.8;
}

.form{
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
}

.form .form-group{
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    background-color: #2f2f43;
    border-radius: 18px;
    padding: 10px 20px;
    height: 67px;
    border: 1px solid rgba(255, 255, 255, 0.06);
}

.form .form-group label{
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 6px;
    opacity: 0.6;
}

.form .form-group input{
    border: none;
    background-color: #2f2f43;
    color: white;
}

.form .form-group input:focus{
    border: none;
    outline: none;
}

.form .form-group input:active{
    border: none;
    outline: none;
}

.form .change{
    color: white;
    background-color:#181828;
    border: none;
    font-size:14px;
    font-weight: 400;
    margin-bottom: 1rem;
    cursor: pointer;
}

.form .submit{
    cursor: pointer;
    color: white;
    background: linear-gradient(99deg, #236BFE 6.69%, #0d4ed3 80.95%);
    box-shadow: 0px 4px 30px rgba(34, 105, 251, 0.8);
    border-radius: 25px;
    height: 66px;
    width: 130px;
    padding:22px 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    font-size:14px;
    font-weight: bold;
}

@media screen and (min-width: 768px) {
    .form{
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }
    p{
        width: 40%;
    }
} 
`;

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
        <>
            <FormContainer className='form-container'>
                <h1 className='title'>Welcome</h1>
                <h2 className='form-title'>{isLoggingIn ? "Login" : "Sign up"}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <form className="form flex" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="username">User</label>
                        <input type="email" id="username" required placeholder='email' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' required minLength={6} maxLength={16} placeholder="Password" />
                    </div>
                    <button className="change" onClick={() => setIsLoggingIn(!isLoggingIn)}>{isLoggingIn ? "Don't have a account? Register" : "Already registered? Login"}</button>
                    <button className='submit' type="submit" id="login">{isLoggingIn ? "Login" : "Sign up"}</button>
                </form>
            </FormContainer>
        </>
    );
}

export default Login;