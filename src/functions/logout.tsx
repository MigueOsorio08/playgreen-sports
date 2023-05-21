import { auth } from "../firebase/credenciales";
import { signOut } from "firebase/auth";

export default async function logOut () {
    try {
        await signOut(auth)
        window.location.reload();
    } catch (error) {
        console.log(error)
    }
}