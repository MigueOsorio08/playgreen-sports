import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './views/home';
import Login from './views/appAccess';
import { auth } from './firebase/credenciales';
import { onAuthStateChanged } from 'firebase/auth';
import 'firebase/auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import History from './views/history';

function App() {
  const [user, setUser] = useState<any | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUser(usuarioFirebase);
      } else {
        setUser(null);
      }
      setShouldRender(true);
    });

    return () => unsubscribe();

  }, []);

  const usuario = user ? true : false;
  const location = sessionStorage.getItem("location");

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      {usuario && location === "history" ? (
        <>
          <History user={user}/>
          <ToastContainer />
        </>
      ) : (
        <>
          {usuario ? (
            <>
              <Home user={user} />
              <ToastContainer />
            </>
          ) : (
            <>
              <Login />
              <ToastContainer />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
