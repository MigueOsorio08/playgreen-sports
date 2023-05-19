import React, { useState } from 'react';
import './App.css';
import Home from './views/home';
import Login from './views/appAccess';
import {auth} from './firebase/credenciales';
import { onAuthStateChanged } from 'firebase/auth';
import 'firebase/auth'

function App() {
  const [user, setUser] = useState<any | null>(null);

  onAuthStateChanged(auth, usuarioFirebase => {
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    }else{
      setUser(null);
    }
  })

  return user ? <Home user={user} /> : <Login/>
}

export default App;
