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
      setShouldRender(true); // Actualizar la variable de estado para permitir la renderización
    });

    return () => unsubscribe(); // Limpiar el listener en el efecto de limpieza

  }, []);

  const usuario = user ? true : false;
  const location = sessionStorage.getItem("location");

  if (!shouldRender) {
    return null; // No renderizar nada mientras se carga la autenticación
  }

  return (
    <>
      {usuario && location === "history" ? (
        <>
          <History user={user}/>
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
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
