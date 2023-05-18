import React, { useState } from 'react';
import loginWithEmailAndPassword from '../functions/login';
import registerUser from '../functions/registerUser';
// import loginGoogle from '../functions/loginGoogle';

function Login () {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    async function submitHandler(e : any) {
        e.preventDefault();
        const username = e.target.username.value
        const password = e.target.password.value
        console.log("Siiii", username, password)
        // const isRegistering = formData.get("isRegistering");
        if (isLoggingIn) {
            await loginWithEmailAndPassword(username, password);
        }else{
            await registerUser(username, password);
        }
    }

    return (
        <section>
            <h1>{isLoggingIn ? "Inicia session" : "Registrate"}</h1>
            <form className = "form flex" onSubmit={submitHandler}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username"/>
                <label htmlFor="password">Password</label>
                <input type="text" id="password"/>
                <button type="submit" id="login">{isLoggingIn ? "Acceder" : "Registrarse"}</button>
            </form>
                <button className="underline" onClick={() => setIsLoggingIn(!isLoggingIn)}>{isLoggingIn ? "No tienes cuenta? Crea una" : "Ya tienes cuenta? accede"}</button>
        </section>
    );
}

export default Login;