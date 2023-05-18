import { auth } from '../firebase/credenciales';
import { GoogleAuthProvider, signInWithRedirect, signInWithPopup } from 'firebase/auth';

export default async function loginGoogle () {
    try {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    } catch (error) {
        console.log(error)
    }
}