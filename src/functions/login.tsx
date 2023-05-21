import { auth } from "../firebase/credenciales";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';

export default async function loginWithEmailAndPassword(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            toast.error('El usuario no existe, intente con otro o cree una cuenta.');
        } else if (error.code === "auth/wrong-password") {
            toast.error('Contraseña incorrecta. inténtelo de nuevo.');
        } else {
            toast.error('Ha ocurrido un error durante el logueo. Por favor, inténtelo de nuevo.');
        }
    }
}