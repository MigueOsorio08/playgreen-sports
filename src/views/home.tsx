import React from 'react';
import logOut from '../functions/logout';

function Login (user : any) {
    return <div>Home
        <button onClick={logOut}>Logout</button>
    </div>
}

export default Login;