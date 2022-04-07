import { useState, useEffect } from "react";
import { projectAuth, projectFirebase } from "../firebaseConfig/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext()


    const login = async (email, password) => {
        setIsPending(true)
        setError(null)
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // const { uid } = user
            await projectFirebase.collection('users').doc(res.user.uid).update({ online: true })
            // console.log(res.user);
            if (!res) {

                throw new Error('Could not complete signup');
            }

            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
            setIsPending(false)

        } catch (err) {

            if (!isCancelled) {
                console.log(err.message);
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    })

    return { isPending, error, login }
}