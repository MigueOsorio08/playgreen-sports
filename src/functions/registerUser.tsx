import { auth } from '../firebase/credenciales';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

export default async function registerUser(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      toast.error('El correo electrónico ya está en uso. Intente con otro.');
    } else {
      toast.error('Ha ocurrido un error durante el registro. Por favor, inténtelo de nuevo.');
    }
  }
}
