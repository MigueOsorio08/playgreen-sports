import React, { useState } from 'react';
import './App.css';
import Home from './views/home';
import Login from './views/appAccess';
import { auth } from './firebase/credenciales';
import { onAuthStateChanged } from 'firebase/auth';
import 'firebase/auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState<any | null>(null);

  onAuthStateChanged(auth, usuarioFirebase => {
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      setUser(null);
    }
  })

  let place = user ? <Home user={user} /> : <Login />

  return (
    <>
      {place}
      <ToastContainer />
    </>
  )
}

export default App;
